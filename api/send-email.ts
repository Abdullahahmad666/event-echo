import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const text = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) => text(max).optional().default('');
const numberish = z.union([z.number(), z.string()]).transform(String).pipe(text(40)).optional().default('');

/** Sent by the budget planner on /inquire. */
const inquirySchema = z.object({
  name: text(120).min(1),
  email: text(200).email(),
  phone: optionalText(40),
  venue: optionalText(200),
  eventDate: optionalText(40),
  eventType: optionalText(60),
  guestCount: numberish,
  budget: z.number().nonnegative().max(1_000_000),
  florals: optionalText(40),
  package: z.object({
    low: z.number().nonnegative().max(1_000_000),
    high: z.number().nonnegative().max(1_000_000),
    status: z.enum(['within', 'slightly-over', 'over']),
    customized: z.boolean(),
    items: z
      .array(
        z.object({
          category: text(80),
          tier: text(80),
          description: optionalText(200),
          level: z.number().int().min(1).max(10).optional(),
          levels: z.number().int().min(1).max(10).optional(),
        }),
      )
      .max(20),
    notIncluded: z.array(text(80)).max(20).default([]),
    switchedOff: z.array(text(80)).max(20).default([]),
    priorityOrder: z.array(text(80)).max(20).default([]),
  }),
});

type Inquiry = z.infer<typeof inquirySchema>;

/* ------------------------------------------------------------------ */
/* Email template — inline styles + tables so it renders in Gmail,     */
/* Outlook and Apple Mail alike.                                       */
/* ------------------------------------------------------------------ */

const c = {
  page: '#F3EEE7',
  card: '#FFFDFA',
  espresso: '#2E2621',
  cream: '#F6F1EA',
  ink: '#2B2420',
  muted: '#8A7B6F',
  line: '#E8DFD4',
  clay: '#94604B',
  sienna: '#C9A898',
};
const serif = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const sans = "'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const statusStyle: Record<Inquiry['package']['status'], { label: string; fg: string; bg: string }> = {
  within: { label: 'Within budget', fg: '#4F6B4B', bg: '#E6EDE2' },
  'slightly-over': { label: 'A little over budget', fg: '#97682F', bg: '#F5EADB' },
  over: { label: 'Over budget', fg: c.clay, bg: '#F3E1D9' },
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const money = (n: number) => `$${Math.round(n).toLocaleString('en-CA')}`;
const orDash = (value: string) => (value ? escapeHtml(value) : `<span style="color:${c.muted}">Not shared</span>`);

/** "2027-08-14" → "Saturday, August 14, 2027" (falls back to the raw value). */
function prettyDate(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return value;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function daysUntil(value: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const diff = Date.UTC(+m[1], +m[2] - 1, +m[3]) - Date.now();
  return Math.ceil(diff / 86_400_000);
}

const label = (t: string) =>
  `<div style="font-family:${sans};font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${c.muted}">${t}</div>`;

const sectionTitle = (t: string) => `
  <tr><td style="padding:36px 40px 14px">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="width:28px;border-top:1px solid ${c.clay};font-size:0;line-height:0">&nbsp;</td>
      <td style="padding-left:12px;font-family:${sans};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${c.clay}">${t}</td>
    </tr></table>
  </td></tr>`;

function dots(level?: number, levels?: number): string {
  if (!level || !levels) return '';
  return Array.from({ length: levels }, (_, i) =>
    `<span style="color:${i < level ? c.clay : c.line};font-size:12px;letter-spacing:3px">&#9679;</span>`,
  ).join('');
}

function button(href: string, text: string, filled: boolean): string {
  return `<td style="padding:0 8px 8px 0">
    <a href="${href}" style="display:inline-block;padding:13px 22px;font-family:${sans};font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;${
      filled ? `background:${c.espresso};color:${c.cream};border:1px solid ${c.espresso}` : `background:transparent;color:${c.espresso};border:1px solid ${c.espresso}`
    }">${text}</a></td>`;
}

function inquiryEmail(d: Inquiry, submittedAt: Date): string {
  const p = d.package;
  const status = statusStyle[p.status];
  const hasPackage = p.items.length > 0;
  const firstName = escapeHtml(d.name.split(/\s+/)[0] || d.name);
  const fill = p.status === 'within' && d.budget > 0 ? Math.max(4, Math.min(100, Math.round((p.high / d.budget) * 100))) : 100;
  const days = daysUntil(d.eventDate);
  const subline = [
    d.eventType && escapeHtml(d.eventType),
    d.eventDate && escapeHtml(prettyDate(d.eventDate)),
    d.guestCount && `${escapeHtml(d.guestCount)} guests`,
  ]
    .filter(Boolean)
    .join(' &nbsp;&middot;&nbsp; ');
  const telHref = d.phone.replace(/[^\d+]/g, '');
  const submitted = submittedAt.toLocaleString('en-CA', {
    timeZone: 'America/Toronto',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const detail = (name: string, value: string) => `
    <td width="50%" valign="top" style="padding:0 12px 22px 0">
      ${label(name)}
      <div style="font-family:${serif};font-size:19px;line-height:1.3;color:${c.ink};padding-top:4px;word-break:break-word">${value}</div>
    </td>`;

  const items = p.items.length
    ? p.items
        .map(
          (i, idx) => `
      <tr><td style="padding:18px 0;${idx ? `border-top:1px solid ${c.line}` : ''}">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td valign="top">
            ${label(escapeHtml(i.category))}
            <div style="font-family:${serif};font-size:24px;line-height:1.2;color:${c.ink};padding-top:3px">${escapeHtml(i.tier)}</div>
            ${i.description ? `<div style="font-family:${sans};font-size:13px;line-height:1.5;color:${c.muted};padding-top:3px">${escapeHtml(i.description)}</div>` : ''}
          </td>
          <td valign="top" align="right" style="white-space:nowrap;padding-left:16px;padding-top:18px">${dots(i.level, i.levels)}</td>
        </tr></table>
      </td></tr>`,
        )
        .join('')
    : `<tr><td style="padding:18px 0;font-family:${serif};font-size:20px;font-style:italic;color:${c.muted}">
         Their budget was below the smallest package, so nothing was selected. Worth a creative conversation.
       </td></tr>`;

  const priorityChips = p.priorityOrder
    .map(
      (name, i) =>
        `<span style="display:inline-block;margin:0 6px 8px 0;padding:6px 12px;border:1px solid ${c.line};background:${c.cream};font-family:${sans};font-size:12px;color:${c.ink}"><b style="color:${c.clay};font-family:${serif};font-size:14px">${i + 1}</b>&nbsp; ${escapeHtml(name)}</span>`,
    )
    .join('');

  const extras = [
    p.notIncluded.length &&
      `<tr><td style="padding:0 40px 10px;font-family:${sans};font-size:13px;line-height:1.6;color:${c.ink}">
        <span style="color:${c.clay}">&#9670;</span>&nbsp; <b>Wanted, but over budget:</b> ${p.notIncluded.map(escapeHtml).join(', ')}
      </td></tr>`,
    p.switchedOff.length &&
      `<tr><td style="padding:0 40px 10px;font-family:${sans};font-size:13px;line-height:1.6;color:${c.muted}">
        <span>&#9675;</span>&nbsp; <b>Not needed:</b> ${p.switchedOff.map(escapeHtml).join(', ')}
      </td></tr>`,
  ]
    .filter(Boolean)
    .join('');

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<title>New inquiry from ${escapeHtml(d.name)}</title>
</head>
<body style="margin:0;padding:0;background:${c.page}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">
  ${escapeHtml(d.name)} built a ${money(p.low)}&ndash;${money(p.high)} package${d.eventType ? ` for their ${escapeHtml(d.eventType.toLowerCase())}` : ''}. ${status.label}.
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.page}">
<tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${c.card};border:1px solid ${c.line}">

  <!-- Header -->
  <tr><td style="background:${c.espresso};padding:30px 40px 28px">
    <div style="font-family:${sans};font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${c.sienna}">New inquiry</div>
    <div style="font-family:${serif};font-size:24px;line-height:1.25;color:${c.cream};letter-spacing:0.5px;padding-top:6px">Decor by Connecting the Dots</div>
  </td></tr>
  <tr><td style="height:4px;background:${c.clay};font-size:0;line-height:0">&nbsp;</td></tr>

  <!-- Hero -->
  <tr><td style="padding:40px 40px 8px">
    ${label('Planned with the budget planner')}
    <div style="font-family:${serif};font-size:42px;line-height:1.1;color:${c.ink};padding-top:10px">${escapeHtml(d.name)}</div>
    ${subline ? `<div style="font-family:${sans};font-size:14px;line-height:1.6;color:${c.muted};padding-top:10px">${subline}</div>` : ''}
    ${
      days !== null && days > 0
        ? `<div style="font-family:${serif};font-size:17px;font-style:italic;color:${c.clay};padding-top:6px">${days.toLocaleString('en-CA')} days to go</div>`
        : ''
    }
  </td></tr>

  <!-- Package highlight -->
  <tr><td style="padding:28px 40px 4px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.cream};border:1px solid ${c.line}">
      <tr><td style="padding:28px 28px 24px">
        ${label(p.customized ? 'Their package &middot; adjusted by them' : 'Their package &middot; our suggestion')}
        ${
          hasPackage
            ? `<div style="font-family:${serif};font-size:42px;line-height:1.1;color:${c.clay};padding-top:12px">${money(p.low)} &ndash; ${money(p.high)}</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px"><tr>
          <td width="${fill}%" style="height:4px;background:${p.status === 'within' ? c.sienna : c.clay};font-size:0;line-height:0">&nbsp;</td>
          ${fill < 100 ? `<td style="height:4px;background:${c.line};font-size:0;line-height:0">&nbsp;</td>` : ''}
        </tr></table>`
            : `<div style="font-family:${serif};font-size:34px;line-height:1.15;font-style:italic;color:${c.clay};padding-top:12px">To be designed together</div>`
        }
        <div style="font-family:${sans};font-size:13px;line-height:2;color:${c.muted};padding-top:10px">
          ${hasPackage ? `<span style="display:inline-block;margin-right:10px;padding:3px 12px;background:${status.bg};color:${status.fg};font-size:11px;letter-spacing:1px;border-radius:999px;white-space:nowrap">${status.label}</span>` : ''}
          <span style="white-space:nowrap">Their decor budget: <b style="color:${c.ink}">${money(d.budget)}</b></span>
        </div>
      </td></tr>
    </table>
  </td></tr>

  <!-- Quick actions -->
  <tr><td style="padding:24px 40px 0">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      ${button(`mailto:${escapeHtml(d.email)}?subject=${encodeURIComponent('Your decor package')}`, `Reply to ${firstName}`, true)}
      ${telHref ? button(`tel:${escapeHtml(telHref)}`, 'Call', false) : ''}
    </tr></table>
  </td></tr>

  ${sectionTitle('What they chose')}
  <tr><td style="padding:0 40px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items}</table>
  </td></tr>

  ${priorityChips ? `${sectionTitle('What matters most to them')}<tr><td style="padding:0 40px 8px">${priorityChips}</td></tr>` : ''}
  ${extras ? `<tr><td style="height:8px;font-size:0;line-height:0">&nbsp;</td></tr>${extras}` : ''}

  ${sectionTitle('The details')}
  <tr><td style="padding:0 40px 10px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>${detail('Email', `<a href="mailto:${escapeHtml(d.email)}" style="color:${c.ink};text-decoration:none;font-size:17px">${escapeHtml(d.email)}</a>`)}${detail('Phone', d.phone ? `<a href="tel:${escapeHtml(telHref)}" style="color:${c.ink};text-decoration:none">${escapeHtml(d.phone)}</a>` : orDash(''))}</tr>
      <tr>${detail('Event', orDash(d.eventType))}${detail('Date', d.eventDate ? escapeHtml(prettyDate(d.eventDate)) : orDash(''))}</tr>
      <tr>${detail('Venue', orDash(d.venue))}${detail('Guests', orDash(d.guestCount))}</tr>
      <tr>${detail('Florals', orDash(d.florals))}${detail('Budget', money(d.budget))}</tr>
    </table>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:24px 40px 32px;border-top:1px solid ${c.line}">
    <div style="font-family:${serif};font-size:17px;font-style:italic;color:${c.ink}">Hit reply to answer ${firstName} directly.</div>
    <div style="font-family:${sans};font-size:11px;line-height:1.6;color:${c.muted};padding-top:6px">
      Submitted ${escapeHtml(submitted)} (Toronto time). Prices shown to the client were estimates from the budget planner.
    </div>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

function inquiryText(d: Inquiry): string {
  const p = d.package;
  return [
    `New inquiry from ${d.name}`,
    '',
    p.items.length
      ? `Package: ${money(p.low)} - ${money(p.high)} (${statusStyle[p.status].label}, budget ${money(d.budget)})`
      : `Package: to be designed together (budget ${money(d.budget)} was below the smallest package)`,
    ...p.items.map((i) => `  - ${i.category}: ${i.tier}`),
    p.notIncluded.length ? `Wanted, but over budget: ${p.notIncluded.join(', ')}` : '',
    p.switchedOff.length ? `Not needed: ${p.switchedOff.join(', ')}` : '',
    `Priority order: ${p.priorityOrder.join(' > ') || 'None'}`,
    '',
    `Email: ${d.email}`,
    `Phone: ${d.phone || 'Not shared'}`,
    `Event: ${d.eventType || 'Not shared'}`,
    `Date: ${d.eventDate ? prettyDate(d.eventDate) : 'Not shared'}`,
    `Venue: ${d.venue || 'Not shared'}`,
    `Guests: ${d.guestCount || 'Not shared'}`,
    `Florals: ${d.florals || 'Not shared'}`,
  ]
    .filter((line, i, all) => line !== '' || all[i - 1] !== '')
    .join('\n');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const emailUser = process.env.EMAIL_USER?.trim();
  const emailPass = process.env.EMAIL_PASS?.replace(/\s/g, '');

  if (!emailUser || !emailPass) {
    return res.status(500).json({
      success: false,
      message: 'Email credentials are not configured. Set EMAIL_USER and EMAIL_PASS in .env.local and restart vercel dev.',
    });
  }

  const parsed = inquirySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: 'Invalid inquiry', issues: parsed.error.flatten() });
  }
  const data = parsed.data;
  // Header values must not contain line breaks.
  const safeName = data.name.replace(/[\r\n]+/g, ' ');

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: `"Event Inquiry" <${emailUser}>`,
      to: emailUser,
      replyTo: { name: safeName, address: data.email },
      subject: data.package.items.length
        ? `New Event Inquiry from ${safeName} (${money(data.package.low)} - ${money(data.package.high)})`
        : `New Event Inquiry from ${safeName}`,
      html: inquiryEmail(data, new Date()),
      text: inquiryText(data),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
