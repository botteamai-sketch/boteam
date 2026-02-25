// ==========================================================
// API Route: Send Lead Emails
// Sends:
// 1. Internal notification to bot.team.ai@gmail.com
// 2. Confirmation email to customer
// ==========================================================

import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("📩 Incoming lead request...");

    const body = await req.json();
    const { name, email, phone, company, extra_message, company_website } = body;

    // Honeypot check
    if (company_website) {
      console.log("🚫 Spam detected (honeypot filled)");
      return NextResponse.json({ success: true });
    }

    if (!email || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ==========================================================
    // Setup Gmail OAuth2
    // ==========================================================

    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // ==========================================================
    // Email 1 – Internal notification
    // ==========================================================

    const adminHtml = `
<!DOCTYPE html>
<html lang="he">
<head>
<meta charset="UTF-8" />
</head>
<body style="margin:0;padding:30px;background:#f4f6f8;direction:rtl;text-align:right;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;padding:30px;">

<tr>
<td>
<h2 style="margin-top:0;">🔔 ליד חדש מהאתר</h2>

<p><strong>שם:</strong> ${name}</p>
<p><strong>אימייל:</strong> ${email}</p>
<p><strong>טלפון:</strong> ${phone || "לא הוזן"}</p>
<p><strong>חברה:</strong> ${company || "לא הוזן"}</p>
<p><strong>משהו שתרצו להוסיף?</strong></p>
<p>${extra_message || "לא הוזן"}</p>

<hr style="margin:20px 0;" />

<p style="font-size:12px;color:#777;">
נשלח אוטומטית מהאתר boteam.org
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    try {
      await sendEmail(
        gmail,
        process.env.GMAIL_SENDER_EMAIL!,
        process.env.GMAIL_SENDER_EMAIL!,
        `🔔 ליד חדש מהאתר מ ${name || "ללא שם"} | ${company || "ללא חברה"}`,
        adminHtml
      );
      console.log("✅ Admin email sent");
    } catch (err) {
      console.error("❌ Failed sending admin email:", err);
      return NextResponse.json(
        { error: "Failed sending admin email" },
        { status: 500 }
      );
    }

    // ==========================================================
    // Email 2 – Customer confirmation
    // ==========================================================

    const customerHtml = `
<!DOCTYPE html>
<html lang="he">
<head>
<meta charset="UTF-8" />
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;direction:rtl;text-align:right;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,0.08);overflow:hidden;">

<tr>
<td style="padding:30px;text-align:center;background:#0f172a;color:white;">
<h1 style="margin:0;font-size:22px;">Boteam</h1>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;font-size:20px;">שלום ${name},</h2>

<p style="font-size:15px;line-height:1.6;color:#333;">
תודה שפנית אלינו.
אנחנו בונים בוטים חכמים שמתחברים ל-Priority
ומנהלים שיחות WhatsApp אמיתיות עד סגירת תהליך.
</p>

<p style="font-size:15px;line-height:1.6;color:#333;">
ניצור איתך קשר בהקדם לתיאום הדגמה קצרה.
</p>

<table cellpadding="0" cellspacing="0" style="margin-top:30px;">
<tr>
<td align="right">
<a href="https://boteam.org"
   style="background:#16a34a;color:white;padding:12px 24px;
   border-radius:8px;text-decoration:none;font-size:14px;display:inline-block;">
לתיאום הדגמה
</a>
</td>
</tr>
</table>

</td>
</tr>

<tr>
<td style="padding:20px;background:#f9fafb;font-size:12px;color:#777;text-align:center;">
© ${new Date().getFullYear()} Boteam. כל הזכויות שמורות.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    try {
      await sendEmail(
        gmail,
        process.env.GMAIL_SENDER_EMAIL!,
        email,
        "קיבלנו את הפרטים שלך 🚀",
        customerHtml
      );
      console.log("✅ Customer email sent");
    } catch (err) {
      console.error("❌ Failed sending customer email:", err);
      return NextResponse.json(
        { error: "Failed sending customer email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending emails:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}

// ==========================================================
// Helper function to send Gmail
// ==========================================================

async function sendEmail(
  gmail: any,
  from: string,
  to: string,
  subject: string,
  html: string
) {
  const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, "utf-8").toString("base64")}?=`;
  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${encodedSubject}`,
    "Content-Type: text/html; charset=utf-8",
    "",
    html,
  ];

  const message = messageParts.join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });
}