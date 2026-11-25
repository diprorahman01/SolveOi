"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, Send } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { products } from "@/lib/products";

type Props = {
  type: "contact" | "demo";
  initialProduct?: string;
};

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const needsCaptcha = process.env.NODE_ENV === "production";
const inputStyles =
  "mt-2 min-h-12 w-full rounded-xl border border-[#f1cba8]/35 bg-gradient-to-br from-[#774a3a]/55 to-[#4b322e]/65 px-4 py-3 text-sm text-[#62483c] shadow-inner shadow-black/5 outline-none placeholder:text-[#62483c] transition focus:border-[#ffcc9e] focus:ring-2 focus:ring-[#ffc48b]/20";
const labelStyles = "block text-sm font-medium text-[#62483c]";

export default function InquiryForm({ type, initialProduct = "" }: Props) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [attempt, setAttempt] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || success) return;
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
      if (!response.ok) throw new Error(result.message || "Submission failed.");
      setSuccess(true);
      setMessage("Your inquiry was submitted successfully. The SolveOi team can now review it.");
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit your inquiry. Please try again.");
    } finally {
      setPending(false);
      setToken("");
      setAttempt((value) => value + 1);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-[#ffd0a5]/35 bg-gradient-to-br from-[#86523e] via-[#694236] to-[#49322e] p-6 text-[#62483c] shadow-[0_20px_62px_rgba(65,34,28,.16)] sm:p-9"
    >
      <div className="mb-7 border-b border-[#ffdaaf]/20 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#985334]">
          {type === "demo" ? "Request a Demo" : "Contact SolveOi"}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#62483c]">
          Tell us a little about your business.
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#62483c]">
          We’ll use your details only to respond to this inquiry.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelStyles}>
          Full name <span className="text-[#985334]">*</span>
          <input className={inputStyles} name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Your name" />
        </label>
        <label className={labelStyles}>
          Business email <span className="text-[#985334]">*</span>
          <input className={inputStyles} name="email" type="email" autoComplete="email" maxLength={200} required placeholder="name@company.com" />
        </label>
      </div>

      <label className={`${labelStyles} mt-5`}>
        Company or organization
        <input className={inputStyles} name="company" type="text" autoComplete="organization" maxLength={150} placeholder="Company name" />
      </label>

      <label className={`${labelStyles} mt-5`}>
        Interested AI product
        <select className={inputStyles} name="product" defaultValue={initialProduct}>
          <option className="bg-[#59392f] text-[#62483c]" value="">General inquiry</option>
          {products.map((product) => (
            <option className="bg-[#59392f] text-[#62483c]" key={product.slug} value={product.slug}>
              {product.name}
            </option>
          ))}
        </select>
      </label>

      <label className={`${labelStyles} mt-5`}>
        {type === "demo" ? "Tell us what you want to see" : "Your message"} <span className="text-[#985334]">*</span>
        <textarea
          className={`${inputStyles} min-h-36 resize-y`}
          name="message"
          minLength={10}
          maxLength={4000}
          required
          placeholder="Tell us about your business and the problem you'd like to solve..."
        />
      </label>

      <div className="hidden" aria-hidden="true">
        <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-xs leading-6 text-[#62483c]">
        <input type="checkbox" name="consent" required className="mt-1.5 size-4 accent-[#f8ae79]" />
        <span>
          I understand SolveOi will use the information in this form to respond to my inquiry.{" "}
          <Link href="/legal/privacy" className="font-semibold text-[#62483c] underline underline-offset-2 hover:text-white">
            Privacy information
          </Link>
        </span>
      </label>

      <div className="mt-5">
        {siteKey ? (
          <Turnstile key={attempt} siteKey={siteKey} onSuccess={setToken} onExpire={() => setToken("")} onError={() => setToken("")} />
        ) : needsCaptcha ? (
          <p role="alert" className="text-sm text-amber-200">Form verification is not configured. Please contact the team by email.</p>
        ) : (
          <p className="text-xs text-[#62483c]">Local development mode: captcha is not configured.</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending || success || (needsCaptcha && !token)}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#ffd5a9]/60 bg-gradient-to-r from-[#ffe0b3] via-[#ffbe83] to-[#f3a06a] px-6 py-3.5 font-bold text-[#3f281f] shadow-[0_10px_24px_rgba(72,34,26,.15)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-55"
      >
        {pending ? <Loader2 size={19} className="animate-spin" /> : <Send size={18} />}
        {pending ? "Submitting..." : success ? "Inquiry submitted" : type === "demo" ? "Request product demonstration" : "Send inquiry"}
      </button>

      {message && (
        <p role={success ? "status" : "alert"} aria-live="polite" className={`mt-5 rounded-xl border p-4 text-sm leading-6 ${success ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-100" : "border-rose-300/30 bg-rose-400/10 text-rose-100"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
