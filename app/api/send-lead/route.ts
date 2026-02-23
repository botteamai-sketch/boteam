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
    const { name, email, phone, message } = body;

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
      <h2>🔔 ליד חדש מהאתר</h2>
      <p><strong>שם:</strong> ${name}</p>
      <p><strong>אימייל:</strong> ${email}</p>
      <p><strong>טלפון:</strong> ${phone || "לא הוזן"}</p>
      <p><strong>הודעה:</strong></p>
      <p>${message || "אין הודעה"}</p>
      <hr/>
      <p>נשלח אוטומטית מהאתר boteam.org</p>
    `;

    await sendEmail(
      gmail,
      process.env.GMAIL_SENDER_EMAIL!,
      process.env.GMAIL_SENDER_EMAIL!,
      "🔔 ליד חדש מהאתר",
      adminHtml
    );

    console.log("✅ Admin email sent");

    // ==========================================================
    // Email 2 – Customer confirmation
    // ==========================================================

    const customerHtml = `
      <div style="font-family: Arial; max-width:600px; margin:auto; padding:20px;">
        <h2 style="color:#111;">שלום ${name},</h2>
        <p>תודה שפנית ל-<strong>Boteam</strong>.</p>
        <p>
          אנחנו בונים בוטים חכמים שמתחברים ל-Priority
          ומנהלים שיחות WhatsApp אמיתיות עד סגירת תהליך.
        </p>
        <p>
          ניצור איתך קשר בהקדם לתיאום הדגמה קצרה.
        </p>
        <p style="margin-top:20px;">
          🚀 <strong>הבוט הראשון עלינו ל-3 חודשים.</strong>
        </p>
        <hr/>
        <p style="font-size:12px;color:#888;">
          boteam.org
        </p>
      </div>
    `;

    await sendEmail(
      gmail,
      process.env.GMAIL_SENDER_EMAIL!,
      email,
      "קיבלנו את הפרטים שלך 🚀",
      customerHtml
    );

    console.log("✅ Customer email sent");

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
  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
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