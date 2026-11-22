
import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Customer Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[65vh] items-center bg-[#080B16] py-24 text-white">
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border border-white/15 bg-white/5 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-400/10">
            <LockKeyhole size={30} className="text-violet-300" />
          </div>

          <h1 className="mt-7 text-4xl font-semibold">
            Your SolveOi workspace is coming.
          </h1>

          <p className="mt-5 leading-8 text-white/60">
            Customer accounts and secure authentication will be introduced
            in the next development milestone. Login is not active yet.
          </p>

          <Link
            href="/solutions"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-[#101C30]"
          >
            Explore solutions
          </Link>
        </div>
      </Container>
    </main>
  );
}
