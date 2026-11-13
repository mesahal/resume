import { motion } from "framer-motion";
import bs23Logo from "../assets/optimized/brain_station_23_logo.jpeg";
import synesisLogo from "../assets/optimized/synesis_it_limited_logo.jpeg";
import bdosnLogo from "../assets/optimized/bdosn_logo.jpeg";

const EXPERIENCES = [
  {
    index: "01",
    company: "Brain Station 23 PLC.",
    role: "Software Engineer I",
    duration: "Apr 2024 – Present",
    status: "Current Role",
    logo: bs23Logo,
    description:
      "Engineered and maintained 50+ RESTful APIs, architected reward systems, built CI/CD pipelines, and currently developing a medical data intelligence platform with OpenAI API integration.",
    achievements: [
      "Engineered and maintained 50+ RESTful APIs using Spring Boot, Oracle, and Vue.",
      "Architected a reward point system based on user transactions and referrals, improving user engagement.",
      "Designed and implemented admin panel APIs and Thymeleaf-based UI for operational monitoring.",
      "Built CI/CD pipelines using Jenkins and Docker Compose, reducing deployment time from hours to minutes.",
      "Currently developing Omnizia, a medical data intelligence platform using Spring Batch and OpenAI API.",
      "Leveraged AI-assisted tools (Claude, Cursor, Windsurf, ChatGPT) for rapid debugging, prototyping, and delivery acceleration.",
    ],
    skills: [
      "Java",
      "Spring Boot",
      "Oracle",
      "Vue",
      "Jenkins",
      "Docker",
      "OpenAI API",
      "CI/CD",
    ],
  },
  {
    index: "02",
    company: "Synesis IT Ltd.",
    role: "Trainee Programmer",
    duration: "Aug 2023 – Mar 2024",
    status: "Enterprise Systems",
    logo: synesisLogo,
    description:
      "Contributed to Convay, an enterprise video conferencing platform. Diagnosed real-time issues, developed meeting scheduling APIs, and implemented a recording alert system.",
    achievements: [
      "Contributed to Convay, an enterprise-grade video conferencing platform.",
      "Diagnosed and resolved real-time issues, improving session stability and user experience.",
      "Developed meeting scheduling APIs and implemented a recording alert system.",
    ],
    skills: [
      "Java",
      "Spring Boot",
      "React",
      "RESTful APIs",
      "Frontend Development",
    ],
  },
  {
    index: "03",
    company: "BdOSN Girls Programming Camp",
    role: "Programming Instructor",
    duration: "2020 – 2021",
    status: "Community & Mentorship",
    logo: bdosnLogo,
    description:
      "Mentored 100+ students in algorithmic problem-solving and competitive programming through online programming classes.",
    achievements: [
      "Mentored 100+ students in algorithmic problem-solving and competitive programming.",
      "Conducted online programming classes covering algorithms and data structures.",
    ],
    skills: [
      "Algorithms",
      "Competitive Programming",
      "Mentoring",
      "Problem Solving",
    ],
  },
];

const Experience = ({ darkMode }) => {
  return (
    <section
      className={`py-28 px-4 sm:px-6 lg:px-10 border-b transition-colors ${
        darkMode
          ? "bg-[#09090e] border-white/[0.08]"
          : "bg-[#fffdf9] border-black/[0.08]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Chapter Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-16 items-end">
          <div className="lg:col-span-7 space-y-3">
            <div className="font-tech-mono text-xs uppercase tracking-[0.22em] text-[#e7dec8] opacity-80">
              CHAPTER 02 // CAREER MONOGRAPH
            </div>
            <h2 className="font-architectural text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.04]">
              Professional{" "}
              <span className="font-editorial-serif italic font-normal champagne-accent-text">
                Trajectory.
              </span>
            </h2>
          </div>
          <p
            className={`lg:col-span-5 text-sm sm:text-base leading-relaxed ${
              darkMode ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            From mentoring 100+ competitive programmers to engineering
            enterprise video conferencing and AI-powered medical data platforms
            in production.
          </p>
        </div>

        {/* Open Architectural Chapters (Zero Boxy Panels — Pure Typographic & Structural Grid) */}
        <div className="divide-y divide-current/15 border-t border-b border-current/15">
          {EXPERIENCES.map((exp, idx) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start group"
            >
              {/* Col 1-2: Monumental Serif Numeral & Tenure */}
              <div className="lg:col-span-2 flex lg:flex-col justify-between items-baseline lg:items-start gap-2">
                <span className="font-editorial-serif italic text-6xl sm:text-7xl leading-none opacity-35 group-hover:opacity-90 group-hover:text-[#e7dec8] transition-all duration-300">
                  {exp.index}
                </span>
                <div className="space-y-1 text-right lg:text-left">
                  <div className="font-tech-mono text-xs uppercase tracking-wider">
                    {exp.duration}
                  </div>
                  <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50">
                    {exp.status}
                  </div>
                </div>
              </div>

              {/* Col 3-5: Organization Identity & Stack */}
              <div className="lg:col-span-4 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white p-2 border border-black/10 shrink-0 shadow-sm">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-architectural text-2xl font-bold tracking-tight">
                      {exp.company}
                    </h3>
                    <div
                      className={`font-editorial-serif italic text-xl mt-0.5 ${
                        darkMode ? "text-[#e7dec8]" : "text-zinc-700"
                      }`}
                    >
                      {exp.role}
                    </div>
                  </div>
                </div>

                {/* Verified Domain Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded-full font-tech-mono text-[11px] border ${
                        darkMode
                          ? "border-white/15 text-zinc-300 bg-white/[0.02]"
                          : "border-black/15 text-zinc-800 bg-black/[0.02]"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Col 6-12: Engineering Logbook & Key Achievements */}
              <div className="lg:col-span-6 space-y-6">
                <p
                  className={`text-base sm:text-lg leading-relaxed font-medium ${
                    darkMode ? "text-zinc-200" : "text-zinc-900"
                  }`}
                >
                  {exp.description}
                </p>

                <div className="space-y-3 pt-2 border-t border-current/10">
                  <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50">
                    VERIFIED PRODUCTION IMPACT &amp; DELIVERABLES
                  </div>
                  <ul className="space-y-2.5">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 text-sm leading-relaxed ${
                          darkMode ? "text-zinc-400" : "text-zinc-700"
                        }`}
                      >
                        <span className="font-tech-mono text-[11px] text-[#e7dec8] opacity-70 mt-0.5 shrink-0">
                          0{i + 1}
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
