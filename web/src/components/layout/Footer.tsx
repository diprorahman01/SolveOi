import Link from "next/link";
import Container from "./Container";

const columns = [
  { title: "Explore", links: [{ title: "Solutions", url: "/solutions" }, { title: "Industries", url: "/industries" }, { title: "Pricing", url: "/pricing" }] },
  { title: "Company", links: [{ title: "About", url: "/about" }, { title: "Contact", url: "/contact" }, { title: "Demo", url: "/demo" }] },
  { title: "Learn", links: [{ title: "Resources", url: "/resources" }, { title: "Documentation", url: "/docs" }] },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080B16] py-14 text-white">
      <Container>
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-2xl font-bold">Solve<span className="text-[#5de0d5]">Oi</span></Link>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">Intelligence That Solves. Practical AI tools for everyday business work.</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="mb-4 text-sm font-semibold">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map((link) => <li key={link.url}><Link href={link.url} className="text-sm text-white/60 hover:text-white">{link.title}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/45">© {new Date().getFullYear()} SolveOi. All rights reserved.</div>
      </Container>
    </footer>
  );
}
