
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle2,
  FileText,
  Layers3,
  MessageSquareText,
  ScanText,
  Sparkles,
} from "lucide-react";

import Container from "@/components/layout/Container";
import ChromeSculpture from "@/components/effects/ChromeSculpture";
import FloatingStar from "@/components/effects/FloatingStar";

const modules = [
  { icon: FileText, name: "Quote", detail: "Quotations" },
  { icon: ScanText, name: "Extract", detail: "Documents" },
  { icon: MessageSquareText, name: "Respond", detail: "Support" },
];

function DashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-[23px] border border-[#D7B18C] bg-[#FFF9F1] shadow-[0_35px_85px_rgba(92,46,20,.16)]">
      {/* Browser bar */}
      <div className="flex h-13 items-center justify-between gap-3 border-b border-[#E8C7A6] bg-[#F5E4D0] px-4 sm:px-6">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#BF5724]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#EBA350]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D8BC91]" />
        </div>

        <div className="max-w-[230px] flex-1 rounded-lg border border-[#DEC0A1] bg-[#FFF8EF] px-3 py-1.5 text-center text-[10px] text-[#86674D]">
          app.solveoi.com / workspace
        </div>

        <span className="hidden rounded-full border border-[#D99D68] bg-[#FFE7C8] px-3 py-1 text-[10px] font-medium text-[#97501F] sm:block">
          Design Concept
        </span>
      </div>

      <div className="grid min-h-[400px] md:grid-cols-[188px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="hidden border-r border-[#E6C7A9] bg-[#F2DEC6] px-4 py-6 md:flex md:flex-col">
          <div className="flex items-center gap-2 px-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8B47C] text-[#7C3614]">
              <Sparkles size={16} />
            </span>
            <span className="text-[13px] font-bold text-[#3B281A]">
              SolveOi
            </span>
          </div>

          <p className="mt-8 px-2 text-[9px] font-semibold tracking-[.15em] text-[#9D7353]">
            WORKSPACE
          </p>

          <div className="mt-3 space-y-1">
            {[
              { icon: Layers3, label: "Overview" },
              { icon: Sparkles, label: "AI Solutions" },
              { icon: CheckCircle2, label: "Approvals" },
              { icon: BarChart3, label: "Activity" },
            ].map(({ icon: Icon, label }, index) => (
              <div
                key={label}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[11px] ${
                  index === 0
                    ? "border border-[#D99B64] bg-[#FFE9D0] font-semibold text-[#934219]"
                    : "text-[#805F47]"
                }`}
              >
                <Icon size={14} />
                {label}
              </div>
            ))}
          </div>

          <div className="mt-auto rounded-xl border border-[#DCB18B] bg-[#FFE8CD] p-3">
            <p className="text-[10px] font-bold text-[#9A471E]">
              Six AI solutions
            </p>
            <p className="mt-2 text-[10px] leading-5 text-[#805F47]">
              One connected business workspace.
            </p>
          </div>
        </aside>

        {/* Dashboard content */}
        <div className="min-w-0 bg-[#FFF9F1] p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-[#B05B25]">
                WORKSPACE OVERVIEW
              </p>

              <h3 className="mt-2 text-lg font-bold tracking-tight text-[#332116] sm:text-2xl">
                Your business, in motion.
              </h3>

              <p className="mt-1 text-[11px] text-[#92745A]">
                Illustrative application interface
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E4C7A8] bg-white text-[#AC6633]">
              <Bell size={17} />
            </div>
          </div>

          {/* Product modules */}
          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            {modules.map(({ icon: Icon, name, detail }) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-xl border border-[#E5C5A4] bg-gradient-to-br from-white to-[#F8E9D6] p-3 transition hover:-translate-y-1 hover:shadow-md sm:p-4"
              >
                <span className="inline-flex rounded-lg bg-[#FFE1BD] p-2 text-[#AD4B19]">
                  <Icon size={18} />
                </span>

                <p className="mt-3 text-[11px] font-bold text-[#362418] sm:text-sm">
                  {name}
                </p>

                <p className="mt-1 text-[9px] text-[#927156] sm:text-[10px]">
                  {detail}
                </p>
              </div>
            ))}
          </div>

          {/* Activity chart and review process */}
          <div className="mt-3 grid gap-3 lg:grid-cols-[1.35fr_.95fr]">
            <div className="min-w-0 rounded-xl border border-[#E5C5A4] bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold text-[#3C2A1B]">
                    Workflow activity
                  </p>

                  <p className="mt-1 text-[9px] text-[#96765D]">
                    Illustrative sample data
                  </p>
                </div>

                <span className="rounded-md border border-[#E8C7A8] px-2 py-1 text-[9px] text-[#826047]">
                  7 days
                </span>
              </div>

              <svg
                viewBox="0 0 420 165"
                role="img"
                aria-label="Illustrative orange workflow activity chart"
                className="mt-4 h-auto w-full"
              >
                <defs>
                  <linearGradient id="so-chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D76A25" stopOpacity=".25" />
                    <stop offset="100%" stopColor="#F6C58B" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient id="so-chart-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#9C411B" />
                    <stop offset="60%" stopColor="#D76A25" />
                    <stop offset="100%" stopColor="#F1A54D" />
                  </linearGradient>
                </defs>

                {[30, 75, 120].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="420"
                    y2={y}
                    stroke="#BFA58C"
                    strokeOpacity=".35"
                    strokeDasharray="4 7"
                  />
                ))}

                <path
                  d="M0 136 C30 125 50 145 80 110 S135 72 165 93 S215 142 242 88 S297 50 325 70 S379 92 420 27 L420 165 L0 165 Z"
                  fill="url(#so-chart-fill)"
                />

                <path
                  d="M0 136 C30 125 50 145 80 110 S135 72 165 93 S215 142 242 88 S297 50 325 70 S379 92 420 27"
                  fill="none"
                  stroke="url(#so-chart-line)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <circle cx="325" cy="70" r="6" fill="#B9501C" />
                <circle cx="325" cy="70" r="12" fill="#E9AA64" opacity=".28" />
              </svg>

              <div className="mt-1 flex justify-between text-[9px] text-[#9B8069]">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                  (day) => <span key={day}>{day}</span>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-[#E5C5A4] bg-white p-4">
              <p className="text-[11px] font-bold text-[#3C2A1B]">
                Example workflow
              </p>

              <div className="mt-5 space-y-4">
                {[
                  ["01", "Customer request", "Input received"],
                  ["02", "AI preparation", "Draft prepared"],
                  ["03", "Human review", "Approve output"],
                ].map(([number, title, subtitle]) => (
                  <div key={number} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F8E1C4] text-[10px] font-bold text-[#A64D1E]">
                      {number}
                    </span>

                    <div>
                      <p className="text-[11px] font-semibold text-[#3F2C20]">
                        {title}
                      </p>
                      <p className="mt-1 text-[9px] text-[#98785F]">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-lg border border-[#E7C49E] bg-[#FFF1DC] px-3 py-2 text-[10px] font-medium text-[#A4511F]">
                Human control at every important step.
              </div>
            </div>
          </div>

          {/* Example output */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E5C5A4] bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFE2C1] text-[#A94D1C]">
                <FileText size={16} />
              </span>

              <div>
                <p className="text-[11px] font-semibold text-[#3E2B1D]">
                  Branded quotation
                </p>

                <p className="text-[9px] text-[#96765D]">
                  Example of a review-ready output
                </p>
              </div>
            </div>

            <span className="rounded-full border border-[#DDAE85] bg-[#FFF1E0] px-3 py-1 text-[10px] font-medium text-[#985021]">
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
    <section className="solveoi-hero relative isolate overflow-hidden text-[#332116]">
      {/* Warm ambient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-[#F2AD5C]/15 blur-[150px]" />

        <div className="absolute -left-40 top-44 h-[460px] w-[460px] rounded-full bg-[#D87938]/12 blur-[130px]" />

        <div className="absolute -right-40 top-64 h-[480px] w-[480px] rounded-full bg-[#F6C589]/25 blur-[130px]" />
      </div>

      {/* Existing animated 3D star */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-2 top-4 z-[2] w-[72px] sm:left-5 sm:top-8 sm:w-[100px] md:left-8 md:top-10 md:w-[130px] lg:left-10 lg:top-12 lg:w-[150px] 2xl:left-[max(8px,calc((100vw-1540px)/2))] 2xl:top-[40px] 2xl:w-[280px]"
      >
        <FloatingStar />
      </div>

      <Container className="relative">
        <div className="relative z-10 mx-auto max-w-5xl pt-14 text-center sm:pt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DDB18A] bg-[#FFF4E5]/85 px-4 py-2 text-xs font-semibold text-[#9F4B1D] shadow-[0_8px_24px_rgba(121,65,28,.08)]">
            <span className="rounded-full bg-gradient-to-r from-[#AC4718] to-[#DF822E] px-2 py-0.5 text-[9px] font-bold text-white">
              AI
            </span>

            Introducing the SolveOi ecosystem

            <Sparkles size={13} className="text-[#BD5C21]" />
          </div>

          <h1 className="mt-6 text-[clamp(3rem,6.3vw,6.4rem)] font-semibold leading-[1.03] tracking-[-0.075em] text-[#332116]">
            Real problems.
            <br />
            <span className="solveoi-gradient-text">
              Intelligent solutions.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#73543E] sm:text-lg">
            Practical AI tools for growing businesses.
            Simplify repetitive workflows, organize information,
            and give your team more room to grow.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A94317] via-[#CB6422] to-[#E89B41] px-6 py-3 text-sm font-bold !text-white shadow-[0_10px_26px_rgba(165,71,22,.2)] transition hover:-translate-y-0.5 hover:shadow-[0_15px_34px_rgba(165,71,22,.28)]"
            >
              Explore Solutions
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl border border-[#D7A67D] bg-[#FFF8EF] px-6 py-3 text-sm font-semibold text-[#85401C] transition hover:bg-[#FFE7CA]"
            >
              Request a Demo
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-[1140px] pb-12 sm:mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -top-12 h-[320px] rounded-full bg-[#E49B4E]/20 blur-[105px]"
          />

          {/* Existing rotating metallic sculpture */}
          <div className="pointer-events-none absolute -right-5 -top-28 z-20 hidden h-[270px] w-[270px] sm:block lg:-right-10 lg:-top-32 lg:h-[330px] lg:w-[330px]">
            <ChromeSculpture />
          </div>

          <div className="relative z-10 rounded-[29px] border border-[#D8A77A] bg-[#F4DFCA]/90 p-2 shadow-[0_22px_65px_rgba(126,63,24,.15)] sm:p-3">
            <DashboardPreview />
          </div>

          <p className="relative mt-5 text-center text-xs text-[#96775D]">
            Visual product concept — AI tools are currently in development.
          </p>
        </div>
      </Container>
    </section>
  );
}
