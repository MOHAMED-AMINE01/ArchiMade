import { Resend } from "resend";

// Best-effort in-memory rate limiter (resets on cold start — deploy-day TODO: durable store).
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

let resendClient: Resend | null = null;

export function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resendClient) resendClient = new Resend(key);
  return resendClient;
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_MAX;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type SendEmailPayload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
  _t?: number;
};

export type SendEmailResult =
  | { ok: false; status: number; error: string }
  | { ok: true; silent: true }
  | {
      ok: true;
      ready: true;
      safeName: string;
      safeEmail: string;
      safeMessage: string;
      replyTo: string;
    };

export function processSendEmailRequest(
  body: SendEmailPayload,
): SendEmailResult {
  const { name, email, message, website, _t } = body;

  if (website) {
    return { ok: true, silent: true };
  }

  if (_t && Date.now() - Number(_t) < 3000) {
    return { ok: true, silent: true };
  }

  if (!name || !email || !message) {
    return { ok: false, status: 400, error: "Tous les champs sont requis." };
  }

  const safeName = escapeHtml(String(name).slice(0, 200));
  const safeEmail = escapeHtml(String(email).slice(0, 200));
  const safeMessage = escapeHtml(String(message).slice(0, 5000));

  return {
    ok: true,
    ready: true,
    safeName,
    safeEmail,
    safeMessage,
    replyTo: String(email).slice(0, 200),
  };
}

export function buildContactEmailHtml(
  safeName: string,
  safeEmail: string,
  safeMessage: string,
): string {
  return `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #e5e5e5; padding: 40px 20px; color: #0a0a0a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d1d1d1; border-radius: 4px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
            <div style="padding: 40px 40px 30px; border-bottom: 1px solid #e5e5e5; text-align: center;">
              <h1 style="font-size:28px;color:#0a0a0a;text-align:center;margin:0 auto 20px;">Archi Made</h1>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.5px; color: #0a0a0a;">
                NOUVEAU MESSAGE
              </h1>
            </div>
            <div style="padding: 40px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0; width: 120px;">
                    <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #999;">Nom</span>
                  </td>
                  <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 15px; font-weight: 600; color: #0a0a0a;">${safeName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #999;">Email</span>
                  </td>
                  <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0;">
                    <a href="mailto:${safeEmail}" style="font-size: 15px; font-weight: 600; color: #0a0a0a; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
              <div style="margin-top: 10px;">
                <p style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 12px;">Message du client</p>
                <div style="background-color: #fafafa; border: 1px solid #eeeeee; border-radius: 4px; padding: 24px; font-size: 15px; line-height: 1.6; color: #333333; white-space: pre-wrap;">${safeMessage}</div>
              </div>
            </div>
            <div style="padding: 24px; background-color: #0a0a0a; text-align: center;">
              <p style="margin: 0; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.5);">
                ARCHI MADE STUDIO &copy; ${new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>`;
}

export async function sendContactEmail(
  safeName: string,
  safeEmail: string,
  safeMessage: string,
  replyTo: string,
): Promise<{ id?: string } | { error: string }> {
  const resend = getResendClient();
  if (!resend) {
    return { error: "Email service not configured (RESEND_API_KEY missing)." };
  }

  const { data, error } = await resend.emails.send({
    from: "ArchiMade <onboarding@resend.dev>",
    to: ["contact@archi-made.com"],
    replyTo,
    subject: `Nouveau message de ${safeName} — ArchiMade`,
    html: buildContactEmailHtml(safeName, safeEmail, safeMessage),
  });

  if (error) {
    console.error("Resend error:", error);
    return { error: "Erreur lors de l'envoi du message." };
  }

  return { id: data?.id };
}
