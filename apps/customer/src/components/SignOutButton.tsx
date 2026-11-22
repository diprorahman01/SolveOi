
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    if (busy) return;

    setBusy(true);
    setError("");

    try {
      const result = await authClient.signOut();

      if (result.error) {
        throw new Error(
          result.error.message || "Sign out failed"
        );
      }

      router.replace("/sign-in");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Sign out failed"
      );

      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        className="outline-button mt-6 text-sm"
        disabled={busy}
        onClick={logout}
      >
        {busy ? "Signing out…" : "Sign out"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
