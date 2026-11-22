
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, Send } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { products } from "@/lib/products";

type FormType = "contact" | "demo";

type Props = {
  type: FormType;
  initialProduct?: string;
};

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const needsCaptcha = process.env.NODE_ENV === "production";

export default function InquiryForm({
  type,
  initialProduct = "",
}: Props) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [attempt, setAttempt] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    if (needsCaptcha && !token) {
      setMessage("Please complete the verification challenge.");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      type,
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim(),
      product: String(data.get("product") || "").trim(),
      message: String(data.get("message") || "").trim(),
      website: String(data.get("website") || ""),
      token,
      consent: data.get("consent") === "on",
    };

    setPending(true);
    setMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submission failed.");
      }

      setSuccess(true);
      setMessage(
        "Your inquiry was submitted successfully. The SolveOi team can now review it."
      );
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your inquiry. Please try again."
      );
    } finally {
      setPending(false);
      setToken("");
      setAttempt((current) => current + 1);
    }
  }

  const inputClass =
    "mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-teal-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/15 bg-[#111929] p-6 shadow-2xl sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-white/80">
          Full name *
          <input
            className={inputClass}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
            placeholder="Your name"
          />
        </label>

        <label className="block text-sm font-medium text-white/80">
          Business email *
          <input
            className={inputClass}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            required
            placeholder="name@company.com"
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium text-white/80">
        Company or organization
        <input
          className={inputClass}
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={150}
          placeholder="Company name"
        />
      </label>

      <label className="mt-5 block text-sm font-medium text-white/80">
        Interested AI product
        <select
          className={inputClass}
          name="product"
          defaultValue={initialProduct}
        >
          <option className="bg-[#101829]" value="">
            General inquiry
          </option>
          {products.map((product) => (
            <option
              className="bg-[#101829]"
              value={product.slug}
              key={product.slug}
            >
              {product.name}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-5 block text-sm font-medium text-white/80">
        {type === "demo" ? "Tell us what you want to see *" : "Your message *"}
        <textarea
          className={`${inputClass} min-h-36 resize-y py-4`}
          name="message"
          minLength={10}
          maxLength={4000}
          required
          placeholder="Tell us about your business and the problem you'd like to solve..."
        />
      </label>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-5 flex items-start gap-3 text-xs leading-6 text-white/60">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1.5 accent-teal-400"
        />
        <span>
          I understand SolveOi will use the information in this form
          to respond to my inquiry.{" "}
          <Link href="/legal/privacy" className="underline hover:text-white">
            Privacy information
          </Link>
        </span>
      </label>

      <div className="mt-5">
        {siteKey ? (
          <Turnstile
            key={attempt}
            siteKey={siteKey}
            onSuccess={setToken}
            onExpire={() => setToken("")}
            onError={() => setToken("")}
          />
        ) : needsCaptcha ? (
          <p className="text-sm text-amber-300">
            Form verification is not configured. Please contact the team by email.
          </p>
        ) : (
          <p className="text-xs text-white/35">
            Local development mode: captcha is not configured.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending || success || (needsCaptcha && !token)}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-[#101C30] transition hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? <Loader2 size={19} className="animate-spin" /> : <Send size={18} />}
        {pending
          ? "Submitting..."
          : success
          ? "Inquiry submitted"
          : type === "demo"
          ? "Request product demonstration"
          : "Send inquiry"}
      </button>

      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-5 rounded-xl p-4 text-sm ${
            success
              ? "bg-teal-400/10 text-teal-200"
              : "bg-rose-400/10 text-rose-200"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
