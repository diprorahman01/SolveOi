export async function sendAuthEmail({to, subject, url, message}: {
  to: string; subject: string; url: string; message: string;
}) {
  if (process.env.NODE_ENV === "development" && process.env.EMAIL_DELIVERY_MODE === "console") {
    console.log("\n===== SOLVEOI DEV EMAIL =====\nTo:", to, "\nSubject:", subject, "\nLink:", url, "\n=============================\n");
    return;
  }
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_FROM_EMAIL;
  if (!apiKey || !from) throw new Error("Email delivery is not configured.");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text: `${message}\n\n${url}` }),
    cache: "no-store", signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Email provider HTTP ${response.status}`);
}
