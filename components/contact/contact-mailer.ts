import { transporter } from "@/lib/mailer";

// contact form mailer handler
export async function ContactFormFB({ userEmail }: { userEmail: string }) {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #2563eb; font-size: 20px; margin-bottom: 16px; }
        .divider { border-top: 1px solid #e2e8f0; margin: 20px 0; }
        .footer { font-size: 12px; color: #64748b; margin-top: 24px; }
    </style>
</head>
<body>
    <div class="header">Thank You for Contacting VCARD</div>

    <p>We've received your message and our team will review it shortly.</p>

    <p>Expect a response within 1-2 business days.</p>

    <div class="divider"></div>

    <p><strong>Reference Email:</strong><br>${userEmail}</p>

    <div class="footer">
        VCARD Team<br>
        team@vcard.itemsfind.com<br>
        +91 9898989898
    </div>
</body>
</html>
    `;

    const res = await transporter.sendMail({
      from: '"VCARD Support" <team@vcard.itemsfind.com>',
      to: userEmail,
      subject: "We've Received Your Message",
      text: `Thank you for contacting VCARD. We've received your message and will respond to ${userEmail} within 1-2 business days.`,
      html: htmlContent,
    });

    console.log("Contact confirmation sent:", res.messageId);
    return res;
  } catch (error) {
    console.error("Failed to send contact confirmation:", error);
    throw new Error("Failed to send contact confirmation email");
  }
}
