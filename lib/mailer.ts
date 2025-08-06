import assert from "node:assert";
import nodemailer from "nodemailer";

const { MAIL_USER, MAIL_PASS, MAIL_HOST, MAIL_PORT } = process.env;

if (!MAIL_USER || !MAIL_PASS || !MAIL_HOST || !MAIL_PORT) {
  throw new Error("Mail env varaisbles are missing");
}
export const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: +MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export async function LoginFB({ userEmail }: { userEmail: string }) {
  assert(userEmail);
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 25px;
        }
        .logo {
            width: 120px;
            height: auto;
        }
        .card {
            border: 1px solid #e1e1e1;
            border-radius: 8px;
            padding: 25px;
            margin: 20px 0;
            background-color: #f9f9f9;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 30px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #2563eb;
            color: white !important;
            text-decoration: none;
            border-radius: 4px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://vcard.itemsfind.com/logo.png" alt="VCARD Logo" class="logo">
        <h2>Security Notification</h2>
    </div>

    <div class="card">
        <p>Hello,</p>
        <p>We detected a new login to your VCARD account:</p>

        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>

        <p>If this was you, no action is required.</p>

        <center>
            <a href="https://vcard.itemsfind.com/account" class="button">
                View Account Activity
            </a>
        </center>
    </div>

    <p>For security reasons, please contact us immediately if you didn't initiate this login.</p>

    <div class="footer">
        <p>© ${new Date().getFullYear()} VCARD - Intelligent Visiting Card Platform</p>
        <p>Gondia, India 441614 | +91 9898989898</p>
    </div>
</body>
</html>
  `;
  // console.log("m", userEmail);
  try {
    const res = await transporter.sendMail({
      from: "team@vcard.itemsfind.com",
      to: userEmail,
      subject: "New Login Detected on Your VCARD Account",
      text: `We detected a new login to your VCARD account (${userEmail}) at ${new Date().toLocaleString()}. If this wasn't you, please contact us immediately.`,
      html: htmlContent,
    });
    console.log("res", res.messageId);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send mail");
  }
}
