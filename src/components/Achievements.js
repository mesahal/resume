import { useState } from "react";
import { ArrowUpRight, Award } from "lucide-react";
import codeforces from "../assets/codeforces.webp";
import leetcode from "../assets/optimized/leetcode.png";
import atcoder from "../assets/optimized/atcoder.png";
import codechef from "../assets/optimized/codechef.jpeg";
import lightoj from "../assets/optimized/lightoj.jpeg";
import uva from "../assets/optimized/uva.png";
import aust from "../assets/optimized/austiupc.jpeg";
import ruet from "../assets/optimized/ruetiupc.jpeg";
import mbstu from "../assets/optimized/mbstuiupc.jpeg";

const PLATFORMS = [
  {
    id: "codeforces",
    name: "Codeforces",
    handle: "@sahal",
    count: 2750,
    share: 78.5,
    rating: "Max Rating 1694",
    accent: "#22d3ee",
    link: "https://codeforces.com/profile/sahal",
    logo: codeforces,
    note: "Primary algorithmic training ground — 2,750+ problems solved across Div. 1/2/3 rounds.",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    handle: "@sahal2000",
    count: 250,
    share: 7.2,
    rating: "Max Rating 1747",
    accent: "#fbbf24",
    link: "https://leetcode.com/sahal2000/",
    logo: leetcode,
    note: "Data structures, interview algorithms, and weekly contest problem solving.",
  },
  {
    id: "atcoder",
    name: "AtCoder",
    handle: "@sahal2000",
    count: 200,
    share: 5.7,
    rating: "Max Rating 678",
    accent: "#34d399",
    link: "https://atcoder.jp/users/sahal2000",
    logo: atcoder,
    note: "Mathematical and combinatorics-heavy Japanese competitive programming contests.",
  },
  {
    id: "uva",
    name: "UVa Online Judge",
    handle: "ID #955955",
    count: 150,
    share: 4.3,
    rating: "150+ Classical",
    accent: "#a78bfa",
    link: "https://uhunt.onlinejudge.org/id/955955",
    logo: uva,
    note: "Classic ACM-ICPC archive problems in graph theory and computational geometry.",
  },
  {
    id: "lightoj",
    name: "LightOJ",
    handle: "@sahal",
    count: 100,
    share: 2.9,
    rating: "100+ Archive",
    accent: "#f472b6",
    link: "https://lightoj.com/user/sahal",
    logo: lightoj,
    note: "Structured algorithmic problem sets created by top Bangladeshi problem setters.",
  },
  {
    id: "codechef",
    name: "CodeChef",
    handle: "@sahal2000",
    count: 50,
    share: 1.4,
    rating: "Max Rating 1759",
    accent: "#fb923c",
    link: "https://www.codechef.com/users/sahal2000",
    logo: codechef,
    note: "Rated long and short contests achieving a peak rating of 1759.",
  },
];

const ONSITE_CONTESTS = [
  {
    contest: "MBSTU IDPC 2020A",
    university: "Mawlana Bhashani Science and Technology University",
    shortUni: "MBSTU",
    position: "11th",
    image: mbstu,
    span: "lg:col-span-6",
  },
  {
    contest: "RUET IUPC 2022",
    university: "Rajshahi University of Engineering & Technology",
    shortUni: "RUET",
    position: "35th",
    image: ruet,
    span: "lg:col-span-3",
  },
  {
    contest: "AUST IUPC 2022",
    university: "Ahsanullah University of Science and Technology",
    shortUni: "AUST",
    position: "42nd",
    image: aust,
    span: "lg:col-span-3",
  },
];

const Achievements = ({ darkMode }) => {
  const [activePlatformId, setActivePlatformId] = useState("codeforces");
  const totalProblems = PLATFORMS.reduce((acc, p) => acc + p.count, 0);

  return (
    <section
      className={`py-28 px-4 sm:px-6 lg:px-10 border-b transition-colors ${
        darkMode
          ? "bg-[#040407] border-white/[0.08]"
          : "bg-[#f3efe8] border-black/[0.08]"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Part 1: Monumental 3,500+ Typography & Interactive Proportional Spectrum */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="font-tech-mono text-xs uppercase tracking-[0.22em] text-cyan-400">
                CHAPTER 03 // ALGORITHMIC PROBLEM SOLVING
              </div>
              <h2 className="font-architectural text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.04]">
                The{" "}
                <span className="font-editorial-serif italic font-normal champagne-accent-text">
                  Algorithmic
                </span>{" "}
                Foundation.
              </h2>
            </div>

            {/* Giant Sculptural Counter */}
            <div className="lg:col-span-5 lg:text-right">
              <div className="font-editorial-serif italic text-7xl sm:text-8xl lg:text-9xl leading-none tracking-tight text-cyan-400">
                {totalProblems.toLocaleString()}+
              </div>
              <div className="font-tech-mono text-xs uppercase tracking-widest opacity-60 mt-2">
                VERIFIED SOLUTIONS ACROSS 6 GLOBAL JUDGES
              </div>
            </div>
          </div>

          {/* Interactive Proportional Judge Spectrum Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-tech-mono text-[11px] opacity-60">
              <span>PROPORTIONAL PROBLEM DISTRIBUTION</span>
              <span>CLICK OR HOVER ANY SEGMENT TO INSPECT</span>
            </div>
            <div className="h-4 w-full rounded-full overflow-hidden flex gap-1 p-1 border border-current/15">
              {PLATFORMS.map((p) => {
                const isSelected = activePlatformId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePlatformId(p.id)}
                    onMouseEnter={() => setActivePlatformId(p.id)}
                    style={{
                      width: `${Math.max(p.share, 5)}%`,
                      backgroundColor: p.accent,
                      opacity: isSelected ? 1 : 0.45,
                    }}
                    className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300"
                    title={`${p.name}: ${p.count}+ problems`}
                  />
                );
              })}
            </div>
          </div>

          {/* Architectural Ledger of Online Judges (Horizontal Table Rows — Not Boxy Cards!) */}
          <div className="divide-y divide-current/15 border-t border-b border-current/15">
            {PLATFORMS.map((platform, idx) => {
              const isSelected = activePlatformId === platform.id;
              return (
                <div
                  key={platform.id}
                  onMouseEnter={() => setActivePlatformId(platform.id)}
                  onClick={() => setActivePlatformId(platform.id)}
                  className={`py-5 px-3 sm:px-5 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-4 items-center cursor-pointer ${
                    isSelected
                      ? darkMode
                        ? "bg-white/[0.04]"
                        : "bg-black/[0.04]"
                      : "opacity-75 hover:opacity-100"
                  }`}
                >
                  {/* Judge Name & Logo */}
                  <div className="md:col-span-4 flex items-center gap-4">
                    <span className="font-tech-mono text-xs opacity-40 w-5">
                      0{idx + 1}
                    </span>
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-1.5 border border-black/10 shrink-0">
                      <img
                        src={platform.logo}
                        alt={platform.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-architectural font-bold text-lg leading-tight">
                        {platform.name}
                      </div>
                      <div className="font-tech-mono text-[11px] opacity-60">
                        {platform.handle}
                      </div>
                    </div>
                  </div>

                  {/* Problem Count & Peak Rating */}
                  <div className="md:col-span-3 flex items-baseline gap-3">
                    <span
                      className="font-editorial-serif italic text-3xl sm:text-4xl"
                      style={{ color: platform.accent }}
                    >
                      {platform.count}+
                    </span>
                    <span className="font-tech-mono text-xs opacity-75">
                      {platform.rating}
                    </span>
                  </div>

                  {/* Description Note */}
                  <div
                    className={`md:col-span-3 text-xs leading-relaxed ${
                      darkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {platform.note}
                  </div>

                  {/* Direct Verification Link */}
                  <div className="md:col-span-2 md:text-right">
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-tech-mono text-xs font-medium hover:underline"
                      style={{ color: platform.accent }}
                    >
                      <span>Verify Profile</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Onsite Inter-University Contest Field Documentary Gallery */}
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-tech-mono text-xs uppercase tracking-[0.22em] text-[#e7dec8] opacity-80">
                FIELD DOCUMENTARY // NATIONAL ONSITE CONTESTS
              </div>
              <h3 className="font-architectural text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                Inter-University{" "}
                <span className="font-editorial-serif italic font-normal">
                  Arena Standings.
                </span>
              </h3>
            </div>
            <p className="font-tech-mono text-xs opacity-60 max-w-sm">
              Representing Jahangirnagar University in 5-hour onsite national
              programming contests.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {ONSITE_CONTESTS.map((contest) => (
              <div
                key={contest.contest}
                className={`${contest.span} group relative rounded-[28px] overflow-hidden border ${
                  darkMode ? "border-white/15" : "border-black/15 shadow-lg"
                }`}
              >
                <div className="relative h-72 sm:h-80 overflow-hidden bg-zinc-950">
                  <img
                    src={contest.image}
                    alt={contest.contest}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                  {/* Top Rank Medallion */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 font-tech-mono text-xs text-white">
                      {contest.shortUni}
                    </span>
                    <span className="px-3.5 py-1 rounded-full bg-[#e7dec8] text-black font-tech-mono text-xs font-bold flex items-center gap-1.5">
                      <Award size={13} />
                      Ranked {contest.position}
                    </span>
                  </div>

                  {/* Bottom Archival Caption */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="font-architectural text-2xl font-bold tracking-tight">
                      {contest.contest}
                    </div>
                    <div className="text-xs text-zinc-300 mt-1">
                      {contest.university}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
