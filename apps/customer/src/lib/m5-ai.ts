import "server-only";

export type AIResult = { text: string; model: string; inputTokens: number; outputTokens: number };

/** A shared, server-only AI gateway. It is deliberately disabled unless explicitly enabled. */
export async function runApprovedSandbox(input: string): Promise<AIResult> {
  if (process.env.M5_AI_ENABLED !== "true") throw new Error("AI gateway disabled. Set M5_AI_ENABLED=true after configuring spending limits.");
  const token = process.env.OPENAI_API_KEY;
  if (!token) throw new Error("OPENAI_API_KEY has not been configured");
  const model = process.env.M5_AI_MODEL || "gpt-4.1-mini";
  const signal = AbortSignal.timeout(25000);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST", signal,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, input: [
      { role: "system", content: "You are testing SolveOi's shared infrastructure. Respond briefly and safely. Do not execute actions or expose secrets." },
      { role: "user", content: input.slice(0, 1500) },
    ], max_output_tokens: 220, store: false }),
  });
  if (!response.ok) throw new Error(`AI provider returned HTTP ${response.status}`);
  const data = await response.json() as {
    output_text?: string;
    output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
    usage?: { input_tokens?: number; output_tokens?: number };
  };
  const text = data.output_text || data.output?.flatMap(row => row.content || []).filter(row => row.type === "output_text").map(row => row.text || "").join("\n") || "";
  if (!text) throw new Error("AI provider returned no usable output");
  return { text: text.slice(0, 10000), model, inputTokens: data.usage?.input_tokens || 0, outputTokens: data.usage?.output_tokens || 0 };
}
