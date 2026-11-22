
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle2,
  CircleDot,
  FileText,
  Layers3,
  MessageSquareText,
  ScanText,
  Settings2,
  Sparkles,
} from "lucide-react";

import Container from "@/components/layout/Container";
import ChromeSculpture from "@/components/effects/ChromeSculpture";
import FloatingStar from "@/components/effects/FloatingStar";

const modules = [
  {
    icon: FileText,
    name: "Quote",
    detail: "Quotations",
    color: "#B985FF",
  },
  {
    icon: ScanText,
    name: "Extract",
    detail: "Documents",
    color: "#6EDBE8",
  },
  {
    icon: MessageSquareText,
    name: "Respond",
    detail: "Support",
    color: "#9F82FF",
  },
];

function DashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/[0.13] bg-[#0B0811] shadow-[0_40px_100px_rgba(0,0,0,0.65)]">
      {/* Browser top bar */}
      <div className="flex h-13 items-center justify-between gap-3 border-b border-white/[0.08] bg-[#13101C] px-4 sm:px-6">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E17C9D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E9BF74]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#82BEA0]" />
        </div>

        <div className="max-w-[230px] flex-1 rounded-lg border border-white/[0.07] bg-white/[0.035] px-3 py-1.5 text-center text-[10px] text-white/35">
          app.solveoi.com / workspace
        </div>

        <span className="hidden rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[10px] text-violet-200 sm:block">
          Design Concept
        </span>
      </div>

      <div className="grid min-h-[410px] md:grid-cols-[188px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="hidden border-r border-white/[0.08] bg-[#100C18] px-4 py-6 md:flex md:flex-col">
          <div className="flex items-center gap-2 px-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 text-violet-200">
              <Sparkles size={16} />
            </span>

            <span className="text-[13px] font-semibold text-white">
              SolveOi
            </span>
          </div>

          <p className="mt-8 px-2 text-[9px] font-semibold tracking-[0.15em] text-white/25">
            WORKSPACE
          </p>

          <div className="mt-3 space-y-1">
            {[
              { icon: Layers3, label: "Overview", active: true },
              { icon: CircleDot, label: "AI Solutions", active: false },
              { icon: CheckCircle2, label: "Approvals", active: false },
              { icon: BarChart3, label: "Activity", active: false },
              { icon: Settings2, label: "Settings", active: false },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[11px] ${
                  active
                    ? "border border-violet-400/20 bg-violet-500/[0.15] text-violet-100"
                    : "text-white/35"
                }`}
              >
                <Icon size={14} />
                {label}
              </div>
            ))}
          </div>

          <div className="mt-auto rounded-xl border border-violet-400/15 bg-violet-500/[0.08] p-3">
            <p className="text-[10px] font-semibold text-violet-200">
              Six AI solutions
            </p>

            <p className="mt-2 text-[10px] leading-5 text-white/35">
              One connected business workspace.
            </p>
          </div>
        </aside>

        {/* Main dashboard */}
        <div className="min-w-0 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] text-violet-300/70">
                WORKSPACE OVERVIEW
              </p>

              <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-2xl">
                Your business, in motion.
              </h3>

              <p className="mt-1 text-[11px] text-white/35">
                Illustrative application interface
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/40">
              <Bell size={17} />
            </div>
          </div>

          {/* Product overview */}
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            {modules.map(({ icon: Icon, name, detail, color }) => (
              <div
                key={name}
                className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#171121] p-3 sm:p-4"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-7 -top-8 h-20 w-20 rounded-full opacity-15 blur-2xl"
                  style={{ background: color }}
                />

                <Icon
                  size={19}
                  className="relative"
                  style={{ color }}
                  aria-hidden="true"
                />

                <p className="relative mt-4 text-[11px] font-semibold text-white sm:text-sm">
                  {name}
                </p>

                <p className="relative mt-1 text-[9px] text-white/30 sm:text-[10px]">
                  {detail}
                </p>
              </div>
            ))}
          </div>

          {/* Activity chart and workflow */}
          <div className="mt-3 grid gap-3 lg:grid-cols-[1.35fr_0.95fr]">
            <div className="min-w-0 rounded-xl border border-white/[0.08] bg-[#13101C] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-white/85">
                    Workflow activity
                  </p>

                  <p className="mt-1 text-[9px] text-white/30">
                    Illustrative sample data
                  </p>
                </div>

                <span className="rounded-md border border-white/10 px-2 py-1 text-[9px] text-white/35">
                  7 days
                </span>
              </div>

              <svg
                viewBox="0 0 420 165"
                role="img"
                aria-label="Illustrative purple workflow activity chart"
                className="mt-4 h-auto w-full"
              >
                <defs>
                  <linearGradient
                    id="solveoi-chart-fill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#A855F7"
                      stopOpacity="0.38"
                    />
                    <stop
                      offset="100%"
                      stopColor="#A855F7"
                      stopOpacity="0"
                    />
                  </linearGradient>

                  <linearGradient
                    id="solveoi-chart-line"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#7237D3" />
                    <stop offset="60%" stopColor="#AF73FF" />
                    <stop offset="100%" stopColor="#E1B8FF" />
                  </linearGradient>
                </defs>

                {[30, 75, 120].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="420"
                    y2={y}
                    stroke="#FFFFFF"
                    strokeOpacity="0.07"
                    strokeDasharray="4 7"
                  />
                ))}

                <path
                  d="M0 136 C30 125 50 145 80 110 S135 72 165 93 S215 142 242 88 S297 50 325 70 S379 92 420 27 L420 165 L0 165 Z"
                  fill="url(#solveoi-chart-fill)"
                />

                <path
                  d="M0 136 C30 125 50 145 80 110 S135 72 165 93 S215 142 242 88 S297 50 325 70 S379 92 420 27"
                  fill="none"
                  stroke="url(#solveoi-chart-line)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <circle cx="325" cy="70" r="6" fill="#C695FF" />

                <circle
                  cx="325"
                  cy="70"
                  r="12"
                  fill="#C695FF"
                  opacity="0.16"
                />
              </svg>

              <div className="mt-1 flex justify-between text-[9px] text-white/25">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                  (day) => (
                    <span key={day}>{day}</span>
                  )
                )}
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#13101C] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold text-white/85">
                  Example workflow
                </p>

                <span className="text-[9px] text-white/30">
                  3 steps
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {[
                  ["01", "Customer request", "Input received"],
                  ["02", "AI preparation", "Draft prepared"],
                  ["03", "Human review", "Approve output"],
                ].map(([number, title, subtitle]) => (
                  <div key={number} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-[10px] font-semibold text-violet-200">
                      {number}
                    </span>

                    <div>
                      <p className="text-[10px] font-medium text-white/70 sm:text-[11px]">
                        {title}
                      </p>

                      <p className="mt-1 text-[9px] text-white/30">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-violet-400/15 bg-violet-400/[0.06] px-3 py-2 text-[10px] text-violet-200/80">
                Human control at every important step.
              </div>
            </div>
          </div>

          {/* Example output */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#15101E] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                <FileText size={16} />
              </span>

              <div>
                <p className="text-[11px] font-medium text-white/75">
                  Branded quotation
                </p>

                <p className="text-[9px] text-white/30">
                  Example of a review-ready output
                </p>
              </div>
            </div>

            <span className="rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-[10px] text-violet-200">
              Concept preview
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="solveoi-hero relative isolate overflow-hidden bg-[#08050E] text-white">
      {/* Purple ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-[#7624CE]/12 blur-[150px]" />

        <div className="absolute -left-40 top-44 h-[460px] w-[460px] rounded-full bg-[#8B35D0]/15 blur-[130px]" />

        <div className="absolute -right-40 top-64 h-[480px] w-[480px] rounded-full bg-[#6E20C9]/20 blur-[130px]" />
      </div>

      {/* NEW: Second animated object — top left */}
      <div className="pointer-events-none absolute left-[max(8px,calc((100vw-1540px)/2))] top-[40px] z-[2] hidden w-[280px] 2xl:block">
        <FloatingStar />
      </div>

      <Container className="relative">
        {/* Hero introduction — reduced vertical spacing */}
        <div className="relative z-10 mx-auto max-w-5xl pt-14 text-center sm:pt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/[0.07] px-4 py-2 text-xs font-medium text-violet-200 shadow-[0_0_35px_rgba(168,85,247,0.08)]">
            <span className="rounded-full bg-[#B26FFF] px-2 py-0.5 text-[9px] font-bold text-white">
              AI
            </span>

            Introducing the SolveOi ecosystem

            <Sparkles
              size={13}
              className="text-violet-300"
              aria-hidden="true"
            />
          </div>

          <h1 className="mt-6 text-[clamp(3rem,6.3vw,6.4rem)] leading-[1.03] font-semibold tracking-[-0.075em]">
            Real problems.
            <br />

            <span className="solveoi-gradient-text">
              Intelligent solutions.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
            The next generation of practical AI tools for growing
            businesses. Automate repetitive workflows, organize
            information, and give your team more room to grow.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#130B1E] transition hover:-translate-y-0.5 hover:bg-violet-100"
            >
              Explore Solutions
              <ArrowRight size={17} aria-hidden="true" />
            </Link>

            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.045] px-6 py-3 text-sm font-medium text-white/85 transition hover:border-violet-400/50 hover:bg-violet-500/10"
            >
              Request a Demo
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Dashboard — moved closer to the hero text */}
        <div className="relative mx-auto mt-10 max-w-[1140px] pb-12 sm:mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -top-12 h-[320px] rounded-full bg-[#8C33E6]/20 blur-[105px]"
          />

          {/* Existing right-side animated sculpture */}
          <div className="pointer-events-none absolute -right-5 -top-28 z-20 hidden h-[270px] w-[270px] sm:block lg:-right-10 lg:-top-32 lg:h-[330px] lg:w-[330px]">
            <ChromeSculpture />
          </div>

          {/* Dashboard frame */}
          <div className="relative z-10 rounded-[29px] border border-[#A366EA]/25 bg-[#130E1E]/90 p-2 shadow-[0_0_55px_rgba(138,53,220,0.15)] sm:p-3">
            <DashboardPreview />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-16 bottom-6 h-24 rounded-full bg-[#9F44EF]/25 blur-[65px]"
          />

          <p className="relative mt-5 text-center text-xs text-white/30">
            Visual product concept — AI tools are currently in development.
          </p>
        </div>
      </Container>
    </section>
  );
}
