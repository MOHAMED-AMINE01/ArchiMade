import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  isRateLimited,
  msg,
  processSendEmailRequest,
  sendContactEmail,
} from "./send-email-core";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: msg(undefined).methodNotAllowed });
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: msg(req.body?.locale).rateLimited });
  }

  let body = req.body;
  if (!body) {
    try {
      const raw = await new Promise<string>((resolve, reject) => {
        let data = "";
        req.on("data", (chunk: Buffer) => (data += chunk));
        req.on("end", () => resolve(data));
        req.on("error", (err: Error) => reject(err));
      });
      body = JSON.parse(raw || "{}");
    } catch {
      return res.status(400).json({ error: msg(undefined).invalidJson });
    }
  }

  const result = processSendEmailRequest(body);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }
  if ("silent" in result) {
    return res.status(200).json({ success: true });
  }

  try {
    const sendResult = await sendContactEmail(
      result.safeName,
      result.safeEmail,
      result.safeMessage,
      result.replyTo,
      result.locale,
    );
    if ("error" in sendResult) {
      const status = sendResult.error.includes("not configured") ? 503 : 500;
      return res.status(status).json({ error: sendResult.error });
    }
    return res.status(200).json({ success: true, id: sendResult.id });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: msg(req.body?.locale).serverError });
  }
}
