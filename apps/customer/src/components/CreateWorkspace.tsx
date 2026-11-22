
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function CreateWorkspace() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (busy) return;

    setBusy(true);
    setError("");

    try {
      const companyName = name.trim();

      const base = companyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 35);

      const slug = `${base || "company"}-${crypto
        .randomUUID()
        .slice(0, 8)}`;

      const result = await authClient.organization.create({
        name: companyName,
        slug,
      });

      if (result.error) {
        throw new Error(
          result.error.message || "Could not create company"
        );
      }

      if (!result.data?.id) {
        throw new Error(
          "Company creation did not return an organization ID"
        );
      }

      const active = await authClient.organization.setActive({
        organizationId: result.data.id,
      });

      if (active.error) {
        throw new Error(
          active.error.message || "Could not select company"
        );
      }

      router.replace("/app");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create company"
      );

      setBusy(false);
    }
  }

  return (
    <form
      className="glass mx-auto max-w-xl rounded-3xl p-8"
      onSubmit={create}
    >
      <p className="text-xs uppercase tracking-widest text-violet-300">
        Business onboarding
      </p>

      <h1 className="mt-4 text-3xl font-bold">
        Create your company
      </h1>

      <p className="muted mt-4 text-sm">
        You will be the Business Owner. Your team can be
        invited afterward.
      </p>

      <label className="mt-7 block text-sm">
        Company name

        <input
          className="field mt-2"
          minLength={2}
          maxLength={100}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="button mt-6 w-full"
        disabled={busy}
      >
        {busy ? "Creating…" : "Create company"}
      </button>
    </form>
  );
}
