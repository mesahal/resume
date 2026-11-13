import React, { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const SKILL_DOMAINS = [
  {
    id: "backend",
    code: "01",
    title: "Backend & Enterprise Architecture",
    accent: "#34d399",
    summary:
      "Architecting 50+ RESTful APIs, high-volume batch processing jobs, and secure enterprise services.",
    relatedProject: {
      id: "omnizia",
      name: "Omnizia & City Remit @ Brain Station 23",
    },
    skills: [
      {
        name: "Java",
        years: "3+ years",
        context: "Core language across Omnizia, City Remit, Convay & JU Alumni",
      },
      {
        name: "Spring Boot",
        years: "3+ years",
        context: "50+ production RESTful APIs & enterprise backend services",
      },
      {
        name: "RESTful APIs",
        years: "3+ years",
        context: "Remittance, meeting scheduling, reward engines & admin APIs",
      },
      {
        name: "Microservices",
        years: "2+ years",
        context: "Modular service design and distributed backend workflows",
      },
      {
        name: "Spring Security",
        years: "2+ years",
        context: "Authentication, authorization & financial API protection",
      },
      {
        name: "Spring Data JPA",
        years: "2+ years",
        context: "Relational ORM persistence across Oracle, MySQL & PostgreSQL",
      },
      {
        name: "Spring Batch",
        years: "1+ years",
        context: "Automated medical data intelligence jobs in Omnizia",
      },
    ],
  },
  {
    id: "frontend",
    code: "02",
    title: "Frontend & Interactive Interfaces",
    accent: "#38bdf8",
    summary:
      "Building responsive web applications, operational dashboards, and modern user workflows.",
    relatedProject: {
      id: "convay",
      name: "Convay, JU Alumni & Cardinal Tour",
    },
    skills: [
      {
        name: "React",
        years: "3+ years",
        context: "Convay video platform, JU Alumni, Cardinal Tour & RWWS",
      },
      {
        name: "JavaScript",
        years: "4+ years",
        context: "Interactive client logic & asynchronous state management",
      },
      {
        name: "HTML5",
        years: "5+ years",
        context: "Semantic, SEO-friendly document architecture",
      },
      {
        name: "CSS3",
        years: "5+ years",
        context: "Responsive layouts, fluid typography & animations",
      },
      {
        name: "Tailwind CSS",
        years: "2+ years",
        context: "Design systems for Cardinal Tour, RWWS & Amla Kamla",
      },
      {
        name: "Vue",
        years: "1+ years",
        context: "Frontend integration for City Remit & Brain Station 23 APIs",
      },
      {
        name: "Thymeleaf",
        years: "1+ years",
        context: "Operational monitoring & admin panel UI at Brain Station 23",
      },
    ],
  },
  {
    id: "aitools",
    code: "03",
    title: "AI Development & LLM Integration",
    accent: "#c084fc",
    summary:
      "Integrating production LLM APIs and leveraging agentic coding tools for rapid debugging, prototyping, and delivery acceleration.",
    relatedProject: {
      id: "omnizia",
      name: "Omnizia Medical AI & Amla Kamla",
    },
    skills: [
      {
        name: "OpenAI API",
        years: "1+ years",
        context: "AI-driven medical summaries & workflows in Omnizia",
      },
      {
        name: "Claude Code",
        years: "1+ years",
        context: "Agentic architecture, rapid debugging & code synthesis",
      },
      {
        name: "Cursor",
        years: "1+ years",
        context: "AI-assisted full-stack refactoring and velocity",
      },
      {
        name: "Windsurf",
        years: "< 1 year",
        context: "Multi-file context engineering & rapid prototyping",
      },
      {
        name: "ChatGPT",
        years: "2+ years",
        context: "System design exploration & documentation workflows",
      },
      {
        name: "Antigravity",
        years: "< 1 year",
        context: "Agentic pair programming & full-stack engineering",
      },
      {
        name: "Gemini",
        years: "1+ years",
        context: "Multimodal reasoning & technical research",
      },
      {
        name: "Veo3",
        years: "< 1 year",
        context: "Generative video workflows for creative storytelling",
      },
      {
        name: "NanoBanana",
        years: "< 1 year",
        context: "Generative visual asset creation & rapid ideation",
      },
    ],
  },
  {
    id: "database",
    code: "04",
    title: "Database & Enterprise Storage",
    accent: "#fbbf24",
    summary:
      "Designing relational schemas, optimizing queries, and maintaining transactional integrity.",
    relatedProject: {
      id: "city-remit",
      name: "City Remit (Oracle) & Convay (MySQL)",
    },
    skills: [
      {
        name: "Oracle",
        years: "2+ years",
        context: "Enterprise database powering City Remit & BS23 APIs",
      },
      {
        name: "MySQL",
        years: "3+ years",
        context: "Relational persistence for Convay & JU Alumni Association",
      },
      {
        name: "PostgreSQL",
        years: "2+ years",
        context: "Production relational data modeling & indexing",
      },
    ],
  },
  {
    id: "tools",
    code: "05",
    title: "DevOps, CI/CD & Cloud Infrastructure",
    accent: "#fb7185",
    summary:
      "Automating build and deployment pipelines, reducing release cycles from hours to minutes.",
    relatedProject: {
      id: "omnizia",
      name: "Brain Station 23 Automated CI/CD",
    },
    skills: [
      {
        name: "Docker",
        years: "2+ years",
        context: "Containerized microservices & Docker Compose environments",
      },
      {
        name: "Jenkins",
        years: "1+ years",
        context: "Automated CI/CD pipelines cutting deploy time from hours to mins",
      },
      {
        name: "CI/CD",
        years: "2+ years",
        context: "Zero-friction build, test, and deployment automation",
      },
      {
        name: "Git",
        years: "4+ years",
        context: "Distributed version control & collaborative release workflows",
      },
      {
        name: "Linux",
        years: "3+ years",
        context: "Server administration, shell scripting & deployment",
      },
      {
        name: "Maven",
        years: "2+ years",
        context: "Java build lifecycle & dependency management",
      },
      {
        name: "GitHub Actions",
        years: "1+ years",
        context: "Automated repository workflows & continuous integration",
      },
      {
        name: "AWS",
        years: "1+ years",
        context: "Cloud infrastructure & application hosting",
      },
    ],
  },
];

const Skills = ({ darkMode, onSelectProject }) => {
  const [selectedSkill, setSelectedSkill] = useState({
    domainTitle: SKILL_DOMAINS[0].title,
    accent: SKILL_DOMAINS[0].accent,
    relatedProject: SKILL_DOMAINS[0].relatedProject,
    ...SKILL_DOMAINS[0].skills[0],
  });

  return (
    <section
      className={`py-28 px-4 sm:px-6 lg:px-10 border-b transition-colors ${
        darkMode
          ? "bg-[#07070c] border-white/[0.08]"
          : "bg-[#faf7f2] border-black/[0.08]"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Chapter Header + Live Interactive Skill Context Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-current/15">
          <div className="lg:col-span-7 space-y-3">
            <div className="font-tech-mono text-xs uppercase tracking-[0.22em] text-emerald-400">
              CHAPTER 04 // PRODUCTION CAPABILITY MATRIX
            </div>
            <h2 className="font-architectural text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.04]">
              Technical{" "}
              <span className="font-editorial-serif italic font-normal champagne-accent-text">
                Arsenal.
              </span>
            </h2>
          </div>

          {/* Live Inspected Skill Callout */}
          <div
            className={`lg:col-span-5 p-5 rounded-3xl border transition-colors ${
              darkMode
                ? "bg-[#0d0d15] border-white/15"
                : "bg-white border-black/10 shadow-md"
            }`}
          >
            <div className="flex items-center justify-between gap-2 font-tech-mono text-[10px] uppercase tracking-wider opacity-65">
              <span className="flex items-center gap-1.5">
                <Sparkles size={12} style={{ color: selectedSkill.accent }} />
                <span>ACTIVE CAPABILITY LENS</span>
              </span>
              <span>{selectedSkill.years}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-3">
              <h3
                className="font-architectural text-2xl font-bold"
                style={{ color: selectedSkill.accent }}
              >
                {selectedSkill.name}
              </h3>
              {selectedSkill.relatedProject && onSelectProject && (
                <button
                  onClick={() =>
                    onSelectProject(selectedSkill.relatedProject.id)
                  }
                  className="inline-flex items-center gap-1 font-tech-mono text-[11px] hover:underline opacity-80"
                >
                  <span>{selectedSkill.relatedProject.name}</span>
                  <ArrowUpRight size={12} />
                </button>
              )}
            </div>
            <p
              className={`text-xs mt-1.5 leading-relaxed ${
                darkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              {selectedSkill.context}
            </p>
          </div>
        </div>

        {/* Architectural Specification Rows (No Repeated Box Grid — Clean Typographic Streams) */}
        <div className="divide-y divide-current/15 border-b border-current/15">
          {SKILL_DOMAINS.map((domain) => (
            <div
              key={domain.id}
              className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
            >
              {/* Left Domain Title & Summary */}
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center gap-2.5 font-tech-mono text-xs">
                  <span style={{ color: domain.accent }}>{domain.code}</span>
                  <span className="opacity-40">/</span>
                  <span className="uppercase tracking-wider opacity-70">
                    {domain.skills.length} Technologies
                  </span>
                </div>
                <h3 className="font-architectural text-2xl font-bold tracking-tight">
                  {domain.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    darkMode ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {domain.summary}
                </p>
              </div>

              {/* Right Interactive Typographic Skill Stream */}
              <div className="lg:col-span-8 flex flex-wrap gap-2.5">
                {domain.skills.map((skill) => {
                  const isActive = selectedSkill.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onMouseEnter={() =>
                        setSelectedSkill({
                          domainTitle: domain.title,
                          accent: domain.accent,
                          relatedProject: domain.relatedProject,
                          ...skill,
                        })
                      }
                      onClick={() =>
                        setSelectedSkill({
                          domainTitle: domain.title,
                          accent: domain.accent,
                          relatedProject: domain.relatedProject,
                          ...skill,
                        })
                      }
                      className={`group px-4 py-2.5 rounded-full border transition-all duration-200 flex items-center gap-2.5 ${
                        isActive
                          ? darkMode
                            ? "bg-white text-black border-white font-semibold scale-[1.03]"
                            : "bg-[#141413] text-white border-[#141413] font-semibold scale-[1.03]"
                          : darkMode
                          ? "bg-transparent border-white/15 text-zinc-200 hover:border-white/40"
                          : "bg-transparent border-black/15 text-zinc-800 hover:border-black/40"
                      }`}
                    >
                      <span className="text-sm sm:text-base tracking-tight">
                        {skill.name}
                      </span>
                      <span
                        className={`font-tech-mono text-[10px] px-2 py-0.5 rounded-full ${
                          isActive
                            ? darkMode
                              ? "bg-black/10 text-black"
                              : "bg-white/15 text-white"
                            : darkMode
                            ? "bg-white/[0.06] text-zinc-400"
                            : "bg-black/[0.06] text-zinc-600"
                        }`}
                      >
                        {skill.years}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
