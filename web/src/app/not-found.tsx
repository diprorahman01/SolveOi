import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium tracking-widest text-teal-500">404</p>
      <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 opacity-70">This SolveOi page does not exist yet.</p>
      <Link href="/" className="mt-8 underline underline-offset-4">Return home</Link>
    </main>
  );
}
