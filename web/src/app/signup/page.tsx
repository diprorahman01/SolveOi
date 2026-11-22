
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserPlus } from "lucide-react";

import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Create an Account",
  description: "Join SolveOi and create your business workspace.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  const customerAppUrl =
    process.env.CUSTOMER_APP_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "");

  if (customerAppUrl) {
    redirect(new URL("/sign-up", customerAppUrl).toString());
  }

  return (
    <main className="flex min-h-[65vh] items-center bg-[#08060E] py-24 text-white">
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border border-violet-400/15 bg-[#181021] p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-400/10">
            <UserPlus size={30} className="text-violet-300" />
          </div>

          <h1 className="mt-7 text-4xl font-semibold">
            Join SolveOi
          </h1>

          <p className="mt-5 leading-8 text-white/60">
            Account registration is temporarily unavailable.
            Please contact SolveOi for assistance.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-[#101C30]"
          >
            Contact SolveOi
          </Link>
        </div>
      </Container>
    </main>
  );
}
