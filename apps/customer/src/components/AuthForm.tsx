
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

type Mode = "sign-in" | "sign-up" | "forgot" | "reset";

const names: Record<Mode, string> = {
  "sign-in": "Welcome back",
  "sign-up": "Create an account",
  forgot: "Reset your password",
  reset: "Choose a new password",
};

function safeNext(value?: string) {
  return value?.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\")
    ? value
    : "/app";
}

export default function AuthForm({
  mode,
  token,
  next,
}: {
  mode: Mode;
  token?: string;
  next?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [needsVerification, setNeedsVerification] =
    useState(false);

  async function resendVerification() {
    if (resending || busy) return;

    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    setResending(true);
    setError("");
    setInfo("");

    try {
      const result = await authClient.sendVerificationEmail({
        email: email.trim().toLowerCase(),
        callbackURL: `${window.location.origin}/sign-in`,
      });

      if (result.error) {
        throw new Error(
          result.error.message ||
            "Unable to send verification email"
        );
      }

      setInfo(
        "Verification link requested. Check your email. " +
          "In local development, check the customer server terminal."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to resend verification email"
      );
    } finally {
      setResending(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (busy || resending) return;

    setBusy(true);
    setError("");
    setInfo("");
    setNeedsVerification(false);

    try {
      if (mode === "sign-in") {
        const result = await authClient.signIn.email({
          email: email.trim().toLowerCase(),
          password,
        });

        if (result.error) {
          const message =
            result.error.message || "Sign in failed";

          const code = String(result.error.code ?? "");

          if (
            code === "EMAIL_NOT_VERIFIED" ||
            /email.*not.*verif/i.test(message)
          ) {
            setNeedsVerification(true);
            throw new Error(
              "Email not verified. Please verify your email " +
                "before signing in."
            );
          }

          throw new Error(message);
        }

        window.location.assign(safeNext(next));
        return;
      }

      if (mode === "sign-up") {
        const result = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          callbackURL: `${window.location.origin}/sign-in`,
        });

        if (result.error) {
          throw new Error(
            result.error.message || "Registration failed"
          );
        }

        setInfo(
          "Account created. Please verify your email. " +
            "In local development, the verification link " +
            "appears in the customer server terminal."
        );
        return;
      }

      if (mode === "forgot") {
        const result = await authClient.requestPasswordReset({
          email: email.trim().toLowerCase(),
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (result.error) {
          throw new Error(
            result.error.message ||
              "Unable to request password reset"
          );
        }

        setInfo(
          "If an account exists, reset instructions will be sent."
        );
        return;
      }

      if (!token) {
        throw new Error("Password reset token missing");
      }

      const result = await authClient.resetPassword({
        token,
        newPassword: password,
      });

      if (result.error) {
        throw new Error(
          result.error.message || "Password reset failed"
        );
      }

      setInfo("Password updated. You can sign in now.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred"
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-12">
      <div className="glass w-full max-w-[460px] rounded-[28px] p-8 shadow-[0_35px_90px_rgba(0,0,0,.35)] sm:p-10">
        <div className="mb-7 inline-flex h-13 w-13 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-2xl text-violet-200">
          ✦
        </div>

        <p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">
          SolveOi Identity
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          {names[mode]}
        </h1>

        <p className="muted mt-3 text-sm">
          Secure access for your business.
        </p>

        <form className="mt-8 space-y-5" onSubmit={submit}>
          {mode === "sign-up" && (
            <label className="block text-sm">
              Full name
              <input
                className="field mt-2"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}

          {mode !== "reset" && (
            <label className="block text-sm">
              Email address
              <input
                className="field mt-2"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          )}

          {mode !== "forgot" && (
            <label className="block text-sm">
              {mode === "reset" ? "New password" : "Password"}
              <input
                className="field mt-2"
                type="password"
                required
                minLength={
                  mode === "sign-in" ? undefined : 12
                }
                autoComplete={
                  mode === "sign-in"
                    ? "current-password"
                    : "new-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          )}

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200"
            >
              {error}
            </p>
          )}

          {info && (
            <p
              role="status"
              className="rounded-xl bg-violet-500/10 p-3 text-sm text-violet-200"
            >
              {info}
            </p>
          )}

          <button
            type="submit"
            className="button w-full"
            disabled={
              busy ||
              resending ||
              (mode === "reset" && !token)
            }
          >
            {busy
              ? "Processing…"
              : mode === "sign-in"
                ? "Sign in"
                : mode === "sign-up"
                  ? "Create account"
                  : mode === "forgot"
                    ? "Send reset instructions"
                    : "Reset password"}
          </button>
        </form>

        {mode === "sign-in" && (
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={resendVerification}
              disabled={resending || busy}
              className="text-sm font-medium text-violet-300 underline-offset-4 transition hover:text-white hover:underline disabled:opacity-50"
            >
              {resending
                ? "Sending verification link…"
                : needsVerification
                  ? "Resend verification link"
                  : "Need to verify your email?"}
            </button>
          </div>
        )}

        <div className="mt-6 space-y-3 text-center text-sm text-violet-300">
          {mode === "sign-in" && (
            <>
              <Link
                href="/forgot-password"
                className="block"
              >
                Forgot password?
              </Link>

              <Link href="/sign-up" className="block">
                New here? Create an account
              </Link>
            </>
          )}

          {mode === "sign-up" && (
            <Link href="/sign-in">
              Already registered? Sign in
            </Link>
          )}

          {(mode === "forgot" || mode === "reset") && (
            <Link href="/sign-in">
              Return to sign in
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
