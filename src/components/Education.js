import ju from "../assets/optimized/ju.png";
import ndc from "../assets/optimized/ndc.png";
import frii from "../assets/optimized/frii.jpeg";

const EDUCATION = [
  {
    index: "01",
    institution: "Jahangirnagar University",
    department: "Institute of Information Technology (IIT)",
    degree: "Bachelor of Science in Information Technology",
    duration: "February 2018 – March 2023",
    result: "CGPA: 3.51 / 4.00",
    logo: ju,
  },
  {
    index: "02",
    institution: "Notre Dame College",
    department: "Higher Secondary Education · Dhaka",
    degree: "HSC ~ Science",
    duration: "2015 – 2017",
    result: "GPA: 5.00 / 5.00",
    logo: ndc,
  },
  {
    index: "03",
    institution: "Faizur Rahman Ideal Institute",
    department: "Secondary Education · Dhaka",
    degree: "SSC ~ Science",
    duration: "2007 – 2014",
    result: "GPA: 5.00 / 5.00",
    logo: frii,
  },
];

const Education = ({ darkMode }) => {
  return (
    <section
      className={`py-24 px-4 sm:px-6 lg:px-10 border-b transition-colors ${
        darkMode
          ? "bg-[#050508] border-white/[0.08]"
          : "bg-[#f2eee7] border-black/[0.08]"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="font-tech-mono text-xs uppercase tracking-[0.22em] text-[#e7dec8] opacity-80">
              CHAPTER 05 — ACADEMIC PEDIGREE
            </div>
            <h2 className="font-architectural text-4xl sm:text-5xl font-bold tracking-[-0.035em] leading-[1.04]">
              Institutional{" "}
              <span className="font-editorial-serif italic font-normal champagne-accent-text">
                Foundation.
              </span>
            </h2>
          </div>
          <p className="font-tech-mono text-xs opacity-60 max-w-sm">
            Trained in computer science, mathematics, and software engineering
            at Bangladesh’s premier academic institutions.
          </p>
        </div>

        {/* 3-Column Architectural Pedigree Ledger with Hairline Dividers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-b border-current/15 divide-y lg:divide-y-0 lg:divide-x divide-current/15">
          {EDUCATION.map((edu) => (
            <div
              key={edu.institution}
              className="py-10 lg:px-8 first:lg:pl-0 last:lg:pr-0 flex flex-col justify-between gap-8 group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-tech-mono text-xs opacity-50">
                    {edu.index} · {edu.duration}
                  </span>
                  <span className="font-tech-mono text-xs px-2.5 py-0.5 rounded-full border border-current/20 text-emerald-400">
                    {edu.result}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white p-2 border border-black/10 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-architectural text-xl sm:text-2xl font-bold tracking-tight">
                      {edu.institution}
                    </h3>
                    <div className="text-xs opacity-60 mt-0.5">
                      {edu.department}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-current/10 flex items-center justify-between">
                <span className="font-editorial-serif italic text-2xl">
                  {edu.degree}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
