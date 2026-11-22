
import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";

export const runtime = "nodejs";

type Inquiry = {
  type: string;
  name: string;
  email: string;
  company: string;
  product: string;
  message: string;
  website: string;
  token: string;
  consent: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validProducts = new Set(products.map((item) => item.slug));

function field(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function error(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");

    if (origin) {
      try {
        if (new URL(origin).host !== request.nextUrl.host) {
          return error("Invalid request origin.", 403);
        }
      } catch {
        return error("Invalid request origin.", 403);
      }
    }

    if (
      !request.headers.get("content-type")?.includes("application/json")
    ) {
      return error("Expected JSON request.", 415);
    }

    const raw = await request.text();

    if (raw.length > 12000) {
      return error("Request is too large.", 413);
    }

    const body: unknown = JSON.parse(raw);

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return error("Invalid form submission.", 400);
    }

    const values = body as Record<string, unknown>;

    const inquiry: Inquiry = {
      type: field(values.type),
      name: field(values.name),
      email: field(values.email),
      company: field(values.company),
      product: field(values.product),
      message: field(values.message),
      website: field(values.website),
      token: field(values.token),
      consent: values.consent === true,
    };

    // Silently ignore basic honeypot spam.
    if (inquiry.website) {
      return NextResponse.json({ message: "Inquiry received." });
    }

    if (!["contact", "demo"].includes(inquiry.type)) {
      return error("Invalid inquiry type.", 400);
    }

    if (
      inquiry.name.length < 2 ||
      inquiry.name.length > 100 ||
      inquiry.email.length > 200 ||
      !emailPattern.test(inquiry.email) ||
      inquiry.company.length > 150 ||
      inquiry.message.length < 10 ||
      inquiry.message.length > 4000 ||
      (inquiry.product !== "" && !validProducts.has(inquiry.product)) ||
      !inquiry.consent
    ) {
      return error("Please check the form fields and try again.", 400);
    }

    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (process.env.NODE_ENV === "production" && !secret) {
      return error("Form verification is not configured.", 503);
    }

    if (secret) {
      if (!inquiry.token) {
        return error("Please complete the verification challenge.", 400);
      }

      const verification = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            secret,
            response: inquiry.token,
          }),
          cache: "no-store",
          signal: AbortSignal.timeout(10000),
        }
      );

      if (!verification.ok) {
        return error("Unable to verify the request.", 502);
      }

      const verified: { success?: boolean } =
        await verification.json();

      if (!verified.success) {
        return error("Verification failed. Please try again.", 400);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.FORMS_TO_EMAIL;
    const from = process.env.FORMS_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return error("Email delivery is not configured yet.", 503);
    }

    const subject =
      inquiry.type === "demo"
        ? "SolveOi — New demo request"
        : "SolveOi — New contact inquiry";

    const emailText = [
      `Inquiry type: ${inquiry.type}`,
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Company: ${inquiry.company || "Not provided"}`,
      `Product: ${inquiry.product || "General"}`,
      "",
      "Message:",
      inquiry.message,
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: inquiry.email,
        subject,
        text: emailText,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error("SolveOi inquiry email provider error:", response.status);
      return error(
        "We could not submit your inquiry. Please try again later.",
        502
      );
    }

    return NextResponse.json({
      message: "Inquiry submitted successfully.",
    });
  } catch (exception) {
    console.error(
      "SolveOi inquiry processing failed:",
      exception instanceof Error ? exception.message : "Unknown error"
    );

    return error(
      "Unable to process your inquiry. Please try again later.",
      500
    );
  }
}
