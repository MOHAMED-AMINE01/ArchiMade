import express from "express";
import cors from "cors";
import { json } from "express";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import {
  getResendClient,
  isRateLimited,
  processSendEmailRequest,
  sendContactEmail,
} from "./api/send-email-core";

dotenv.config({ path: ".env.local" });

const hasResendKey = Boolean(process.env.RESEND_API_KEY);
console.log(
  hasResendKey
    ? `Resend API key loaded (length ${process.env.RESEND_API_KEY!.length})`
    : "RESEND_API_KEY missing — /api/send-email returns 503 until set in .env.local",
);

const app = express();
app.use(cors());
app.use(json());

app.post("/api/send-email", async (req: Request, res: Response) => {
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: "Trop de requêtes. Réessayez plus tard." });
  }

  const result = processSendEmailRequest(req.body);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  if ("silent" in result) {
    return res.status(200).json({ success: true });
  }

  if (!getResendClient()) {
    return res.status(503).json({
      error:
        "Service email non configuré. Ajoutez RESEND_API_KEY dans .env.local.",
    });
  }

  try {
    const sendResult = await sendContactEmail(
      result.safeName,
      result.safeEmail,
      result.safeMessage,
      result.replyTo,
    );
    if ("error" in sendResult) {
      const status = sendResult.error.includes("not configured") ? 503 : 500;
      return res.status(status).json({ error: sendResult.error });
    }
    return res.json({ success: true, id: sendResult.id });
  } catch (e) {
    console.error("Server error:", e);
    return res.status(500).json({ error: "Erreur serveur." });
  }
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () =>
  console.log(`Express listening on http://localhost:${PORT}`),
);
