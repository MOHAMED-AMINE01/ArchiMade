// server.ts
import express from 'express';
import cors from 'cors';
import { json } from 'express';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { Resend } from 'resend';

dotenv.config({ path: '.env.local' });
console.log('✅ Resend API key loaded, length:', process.env.RESEND_API_KEY?.length ?? 0);

const app = express();
app.use(cors());
app.use(json());

if (!process.env.RESEND_API_KEY) {
  console.error('❗️ RESEND_API_KEY is missing. Check .env.local');
  // We cannot construct Resend without a key; respond with error for all requests
}
const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-email', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
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
          <div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:auto;background:#fafafa;border-radius:12px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <img src="/Logo%20ArchiMade.png" alt="ArchiMade Logo" style="display:block;margin:0 auto 20px;width:120px;height:auto;" />
            <h2 style="font-size:24px;color:#0a0a0a;margin-bottom:16px;text-align:center;">Nouveau Message</h2>
            <p style="margin:8px 0;font-weight:600;"><strong>Nom :</strong> ${name}</p>
            <p style="margin:8px 0;font-weight:600;"><strong>Email :</strong> ${email}</p>
            <p style="margin:8px 0;font-weight:600;"><strong>Message :</strong></p>
            <p style="margin:8px 0;padding:12px;background:#fff;border:1px solid #eee;border-radius:6px;white-space:pre-wrap;">${message}</p>
          </div>`,
    });
    if (error) {
      console.error('Resend error →', error);
      return res.status(500).json({ error: 'Erreur d\'envoi.' });
    }
    return res.json({ success: true, id: data?.id });
  } catch (e) {
    console.error('Server error →', e);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`🚀 Express listening on http://localhost:${PORT}`));
