
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AcceptInvitation({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function accept() {
    if (busy || !id) return;

    setBusy(true);
    setError("");

    try {
      const result =
        await authClient.organization.acceptInvitation({
          invitationId: id,
        });

      if (result.error) {
        throw new Error(
          result.error.message ||
            "Invitation could not be accepted"
        );
      }

      router.replace("/choose-workspace");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to accept invitation"
      );
      setBusy(false);
    }
  }

  return (
    <div className="glass mx-auto max-w-lg rounded-3xl p-9 text-center">
      <h1 className="text-3xl font-bold">
        Join your team
      </h1>

      <p className="muted mt-4">
        Accept your invitation to join your company workspace.
      </p>

      <button
        type="button"
        className="button mt-7"
        onClick={accept}
        disabled={busy || !id}
      >
        {busy ? "Joining…" : "Accept invitation"}
      </button>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
