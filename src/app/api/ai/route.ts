import { NextResponse } from "next/server";

export const runtime = "nodejs";

const model = process.env.OPENROUTER_MODEL || "qwen/qwen3.8-27b:free";
const endpoint = "https://openrouter.ai/api/v1/chat/completions";
const translationInstructions =
  "Translate Malayalam into natural, correct English. The input may be Malayalam script or Manglish (Malayalam written with Latin letters), including casual spelling and colloquial phrasing. Infer the intended Malayalam meaning from context. Preserve names, meaning, and tone. Return only the English translation, with no explanations, transliteration, quotes, or notes. If ambiguous, choose the most likely meaning without inventing details.";

function getTranslation(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || !choices[0] || typeof choices[0] !== "object") return "";
  const message = (choices[0] as { message?: unknown }).message;
  if (!message || typeof message !== "object") return "";
  const content = (message as { content?: unknown }).content;
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .filter((part: unknown): part is { type?: string; text?: string } => !!part && typeof part === "object")
      .filter((part) => part.type === "text" && typeof part.text === "string")
      .map((part) => part.text!.trim())
      .filter(Boolean)
      .join("\n");
  }
  return "";
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Add your OpenRouter key to OPENROUTER_API_KEY in .env.local, then restart the app." },
      { status: 503 },
    );
  }

  let text: unknown;
  try {
    ({ text } = await request.json());
  } catch {
    return NextResponse.json({ error: "Send a valid translation request." }, { status: 400 });
  }

  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Enter text to translate." }, { status: 400 });
  }
  if (text.length > 2000) {
    return NextResponse.json({ error: "Keep the text under 2,000 characters." }, { status: 413 });
  }

  // Free routing can briefly return an empty completion or a gateway error.
  // A single immediate retry keeps the UI responsive while recovering from those blips.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "X-Title": "TapTools",
        },
        body: JSON.stringify({
          model,
          temperature: 0.2,
          max_tokens: 400,
          reasoning: { effort: "none" },
          messages: [
            { role: "system", content: translationInstructions },
            { role: "user", content: text.trim() },
          ],
        }),
        signal: AbortSignal.timeout(18_000),
      });

      const payload = await response.json().catch(() => null);
      if (response.ok) {
        const translation = getTranslation(payload);
        if (translation) return NextResponse.json({ translation });
        if (attempt === 0) continue;
        return NextResponse.json(
          { error: "Qwen is temporarily returning an empty reply. Please try again in a moment." },
          { status: 503 },
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Qwen is busy right now. Please wait a moment and try again." },
          { status: 503 },
        );
      }
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: "OpenRouter rejected the API key. Check OPENROUTER_API_KEY in .env.local." },
          { status: 502 },
        );
      }

      if ([502, 503, 504].includes(response.status) && attempt === 0) continue;
      return NextResponse.json(
        { error: "Qwen could not complete the translation right now. Please try again shortly." },
        { status: 503 },
      );
    } catch {
      if (attempt === 0) continue;
      return NextResponse.json(
        { error: "The translation service timed out or could not be reached. Please try again." },
        { status: 503 },
      );
    }
  }

  return NextResponse.json(
    { error: "Qwen is temporarily unavailable. Please try again in a moment." },
    { status: 503 },
  );
}
