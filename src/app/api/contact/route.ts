import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

// Ensure environment variables exist
const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;
if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
  throw new Error("Missing environment variables for email configuration.");
}

// Email sender setup
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use Gmail, or update for another provider
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Email options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: EMAIL_TO,
      subject: `New Contact Form Submission: ${subject}`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
