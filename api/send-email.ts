import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
if (!body) {
  try {
    const raw = await new Promise<string>((resolve, reject) => {
      let data = '';
      req.on('data', chunk => (data += chunk));
      req.on('end', () => resolve(data));
      req.on('error', err => reject(err));
    });
    body = JSON.parse(raw || '{}');
  } catch (e) {
    console.error('❗️ Unable to parse JSON body:', e);
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
}
console.log('🔍 Vercel received body:', body);
const { name, email, message } = body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'ArchiMade <onboarding@resend.dev>',
      to: ['m.a.khatouf@gmail.com'],
      replyTo: email,
      subject: `Nouveau message de ${name} — ArchiMade`,
      html: `
        <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #e5e5e5; padding: 40px 20px; color: #0a0a0a;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d1d1d1; border-radius: 4px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
            
            <!-- Header Section -->
            <div style="padding: 40px 40px 30px; border-bottom: 1px solid #e5e5e5; text-align: center;">
              <h1 style="font-size:28px;color:#0a0a0a;text-align:center;margin:0 auto 20px;">Archi Made</h1>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: -0.5px; color: #0a0a0a;">
                NOUVEAU MESSAGE
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888888;">
                Demande de contact — archi-made.com
              </p>
            </div>

            <!-- Body Section -->
            <div style="padding: 40px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0; width: 120px;">
                    <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #999;">Nom</span>
                  </td>
                  <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 15px; font-weight: 600; color: #0a0a0a;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0;">
                    <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #999;">Email</span>
                  </td>
                  <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0;">
                    <a href="mailto:${email}" style="font-size: 15px; font-weight: 600; color: #0a0a0a; text-decoration: none;">${email}</a>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 10px;">
                <p style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 12px;">Message du client</p>
                <div style="background-color: #fafafa; border: 1px solid #eeeeee; border-radius: 4px; padding: 24px; font-size: 15px; line-height: 1.6; color: #333333; white-space: pre-wrap;">${message}</div>
              </div>
            </div>

            <!-- Footer Section -->
            <div style="padding: 24px; background-color: #0a0a0a; text-align: center;">
              <p style="margin: 0; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: rgba(255,255,255,0.5);">
                ARCHI MADE STUDIO © ${new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
