import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      budget,
      colorScheme,
      areasRequiringDecor,
      message,
    } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Event Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Event Inquiry from ${name}`,
      html: `
        <h3>New Inquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || 'Not provided'}</p>
        <p><b>Event Type:</b> ${eventType}</p>
        <p><b>Event Date:</b> ${eventDate || 'Not provided'}</p>
        <p><b>Guests:</b> ${guestCount || 'Not provided'}</p>
        <p><b>Color Scheme:</b> ${colorScheme || 'Not provided'}</p>
        <p><b>Areas Requiring Decor:</b> ${areasRequiringDecor || 'Not specified'}</p>
        <p><b>Estimated Budget:</b> ${budget || 'Not specified'}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
