import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

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
          <div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:auto;background:#fafafa;border-radius:12px;padding:20px;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <img src="https://archi-made.com/Logo%20ArchiMade.png" alt="ArchiMade Logo" style="display:block;margin:0 auto 20px;width:120px;height:auto;" />
            <h2 style="font-size:24px;color:#0a0a0a;margin-bottom:16px;text-align:center;">Nouveau Message</h2>
            <p style="margin:8px 0;font-weight:600;"><strong>Nom :</strong> ${name}</p>
            <p style="margin:8px 0;font-weight:600;"><strong>Email :</strong> ${email}</p>
            <p style="margin:8px 0;font-weight:600;"><strong>Message :</strong></p>
            <p style="margin:8px 0;padding:12px;background:#fff;border:1px solid #eee;border-radius:6px;white-space:pre-wrap;">${message}</p>
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
