import { NextResponse } from "next/server";

const nodemailer = require("nodemailer");

export const POST = async (req: Request, res: NextResponse) => {
  const { name, email, phone, location, details, iam } = await req.json();

  if (!name || !email || !phone || !location || !details || !iam) {
    return NextResponse.json({ message: `Invalid Data` }, { status: 422 });
  }
  // Create a transporter object
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com", // e.g., smtp.gmail.com
    port: 587, // or 465 for secure
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // your email
      pass: process.env.EMAIL_PASS, // your email password
    },
  });

  // Set up email data
  let mailOptions = {
    from: process.env.EMAIL, 
    to: "mdrahinzaman21@gmail.com", 
    subject: "New Form Submission", 
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nDetails: ${details}\nI am a: ${iam}`, // plain text body
    html: `<h3>Ambiance Cutomer Information</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Location:</strong> ${location}</p><p><strong>Details:</strong> ${details}</p><p><strong>I am a:</strong> ${iam}</p>`, // html body
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      status: 200,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      status: 500,
      message: "Error sending email",
      error,
    });
  }
};
