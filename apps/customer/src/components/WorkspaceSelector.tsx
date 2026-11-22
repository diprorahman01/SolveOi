
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

type Organization = {
  id: string;
  name: string;
  slug: string;
};

export default function WorkspaceSelector() {
  const router = useRouter();

  const [items, setItems] = useState<Organization[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadOrganizations() {
      try {
        const result = await authClient.organization.list();

        if (!active) return;

        if (result.error) {
          setError(
            result.error.message || "Could not load companies"
          );
        } else {
          setItems(result.data || []);
        }
      } catch {
        if (active) {
          setError("Unable to load your workspaces");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadOrganizations();

    return () => {
      active = false;
    };
  }, []);

  async function choose(id: string) {
    if (busy) return;

    setBusy(true);
    setError("");

    try {
      const result = await authClient.organization.setActive({
        organizationId: id,
      });

      if (result.error) {
        throw new Error(
          result.error.message || "Unable to select company"
        );
      }

      router.replace("/app");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to select company"
      );

      setBusy(false);
    }
  }

  return (
    <div className="glass mx-auto max-w-xl rounded-3xl p-8">
      <h1 className="text-3xl font-bold">
        Choose a company
      </h1>

      <p className="muted mt-3 text-sm">
        Only organizations you belong to appear here.
      </p>

      {loading ? (
        <p className="mt-6 text-violet-300">
          Loading…
        </p>
      ) : items.length > 0 ? (
        <div className="mt-6 space-y-3">
          {items.map((organization) => (
            <button
              key={organization.id}
              type="button"
              disabled={busy}
              onClick={() => choose(organization.id)}
              className="block w-full rounded-xl border border-white/10 p-4 text-left hover:border-violet-400/50"
            >
              <b>{organization.name}</b>

              <span className="muted mt-1 block text-xs">
                {organization.slug}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <Link
          href="/onboarding"
          className="button mt-6"
        >
          Create company
        </Link>
      )}

      {error && (
        <p role="alert" className="mt-5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
