import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // ✅ Allow only POST
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
      subject: `New Event Inquiry from ${name}`,
      html: `
        <h3>New Inquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Event Type:</b> ${eventType}</p>
        <p><b>Event Date:</b> ${eventDate}</p>
        <p><b>Guests:</b> ${guestCount}</p>
        <p><b>Budget:</b> ${budget}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    // ✅ ALWAYS return JSON
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
