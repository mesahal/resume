import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Layers,
  Cpu,
  Eye,
  CheckCircle2,
  ChevronRight,
  Globe,
} from "lucide-react";
import cityremit from "../assets/optimized/cityremit.png";
import convay from "../assets/convay.webp";
import omnizia from "../assets/optimized/Omnizia.webp";
import myLogo from "../assets/optimized/myLogo.webp";
import butterflyImg from "../assets/projects/butterfly.png";
import juAlumniImg from "../assets/projects/ju-alumni.png";
import cardinalImg from "../assets/projects/cardinal.png";
import rwwsImg from "../assets/projects/rwws.png";
import amlaKamlaImg from "../assets/projects/amla-kamla.png";

const PROJECTS = [
  {
    id: "omnizia",
    index: "01",
    title: "Omnizia",
    subtitle: "Medical Data Intelligence Platform",
    category: "backend-ai",
    role: "Backend Developer",
    organization: "Brain Station 23 PLC.",
    accent: "#38bdf8",
    description:
      "Medical data intelligence platform. Developed automated data-processing jobs and integrated OpenAI APIs to generate AI-driven summaries and intelligent workflows.",
    challenge:
      "Processing structured and unstructured medical datasets reliably through automated batch pipelines while integrating OpenAI API synthesis for actionable intelligence.",
    image: omnizia,
    technologies: ["Java", "Spring Boot", "OpenAI API", "Spring Batch"],
    features: [
      "Automated data-processing jobs with Spring Batch",
      "OpenAI API integration for intelligent synthesis",
      "AI-driven clinical and medical data summaries",
      "Intelligent backend workflows and orchestration",
    ],
    architectureFlow: [
      {
        stage: "Ingestion Layer",
        tech: "Spring Batch Jobs",
        detail: "Automated scheduled & chunk-based medical data processing",
      },
      {
        stage: "Core Service",
        tech: "Java & Spring Boot",
        detail: "Business workflow orchestration & domain validation",
      },
      {
        stage: "Intelligence Engine",
        tech: "OpenAI API",
        detail: "AI-driven summarization & structured insight generation",
      },
    ],
    links: {
      live: "#",
    },
  },
  {
    id: "city-remit",
    index: "02",
    title: "City Remit",
    subtitle: "Cross-Border Financial Remittance Engine",
    category: "backend-ai",
    role: "Backend Developer",
    organization: "Brain Station 23 PLC.",
    accent: "#34d399",
    description:
      "Built REST APIs and backend services for secure financial remittance operations and transaction management from Malaysia.",
    challenge:
      "Ensuring strict transactional integrity, secure remittance workflows, and high-reliability REST APIs backed by enterprise Oracle databases.",
    image: cityremit,
    technologies: ["Java", "Spring Boot", "Oracle", "Vue"],
    features: [
      "Cross-border remittance transfer system",
      "Enterprise REST API development",
      "Secure transaction & compliance management",
      "Core backend financial services",
    ],
    architectureFlow: [
      {
        stage: "Client Interface",
        tech: "Vue.js Frontend",
        detail: "Remittance portal & operational monitoring views",
      },
      {
        stage: "API & Business Layer",
        tech: "Spring Boot REST APIs",
        detail: "Transaction processing, validation & reward workflows",
      },
      {
        stage: "Enterprise Persistence",
        tech: "Oracle Database",
        detail: "ACID-compliant financial ledger & transaction storage",
      },
    ],
    links: {
      live: "https://cityremit.cblmoneytransfer.com/login",
    },
  },
  {
    id: "convay",
    index: "03",
    title: "Convay",
    subtitle: "Enterprise Video Conferencing Platform",
    category: "backend-ai",
    role: "Full Stack Developer",
    organization: "Synesis IT Ltd.",
    accent: "#c084fc",
    description:
      "Engineered APIs for meeting scheduling, recording alerts, and enterprise communication workflows for a video conferencing platform.",
    challenge:
      "Diagnosing real-time session stability issues and synchronizing meeting scheduling and recording alert states across distributed participants.",
    image: convay,
    technologies: ["Java", "Spring Boot", "MySQL", "React"],
    features: [
      "Meeting scheduling RESTful APIs",
      "Real-time recording alert notification system",
      "Enterprise communication workflows",
      "Real-time session stability diagnosis & improvements",
    ],
    architectureFlow: [
      {
        stage: "Conference Client",
        tech: "React UI",
        detail: "Interactive meeting controls, scheduling & alert banners",
      },
      {
        stage: "Coordination Layer",
        tech: "Java & Spring Boot",
        detail: "Scheduling APIs, session state & recording triggers",
      },
      {
        stage: "Data Store",
        tech: "MySQL",
        detail: "Meeting metadata, user schedules & audit records",
      },
    ],
    links: {
      live: "https://convay.com/home",
    },
  },
  {
    id: "butterfly",
    index: "04",
    title: "Butterfly Group Bangladesh",
    subtitle: "Native iOS E-Commerce Application",
    category: "ios",
    role: "iOS Developer",
    organization: "Mobile Engineering",
    accent: "#fbbf24",
    description:
      "Contributing to iOS application development, API integration, UI implementation, and deployment workflows for an e-commerce platform.",
    challenge:
      "Crafting a fluid native iOS shopping experience in Swift & SwiftUI while integrating complex e-commerce catalog and checkout APIs.",
    image: butterflyImg,
    technologies: ["Swift", "SwiftUI", "iOS", "Xcode"],
    features: [
      "Native iOS application development",
      "RESTful API integration & state management",
      "Responsive SwiftUI interface implementation",
      "Xcode build & deployment workflows",
    ],
    architectureFlow: [
      {
        stage: "Presentation Layer",
        tech: "SwiftUI Views",
        detail: "Declarative native iOS views & smooth navigation",
      },
      {
        stage: "Application Logic",
        tech: "Swift Networking",
        detail: "Asynchronous API integration & data models",
      },
      {
        stage: "Delivery Pipeline",
        tech: "Xcode Workflows",
        detail: "iOS packaging, testing & release management",
      },
    ],
    links: {
      live: "https://www.butterflygroupbd.com/",
    },
  },
  {
    id: "ju-alumni",
    index: "05",
    title: "JU Alumni Association",
    subtitle: "Organizational & Community Platform",
    category: "fullstack-web",
    role: "Full Stack Developer",
    organization: "IIT, Jahangirnagar University",
    accent: "#60a5fa",
    description:
      "Developed and maintained responsive organizational platform features, user workflows, and modern web interfaces for Jahangirnagar University alumni.",
    challenge:
      "Designing intuitive member registration, directory, and event workflows connecting alumni cohorts across generations.",
    image: juAlumniImg,
    technologies: ["React", "Spring Boot", "Java", "MySQL"],
    features: [
      "Responsive organizational platform features",
      "End-to-end member workflow development",
      "Modern React web interfaces",
      "Spring Boot + MySQL backend management",
    ],
    architectureFlow: [
      {
        stage: "Web Portal",
        tech: "React Frontend",
        detail: "Responsive alumni directory & event workflows",
      },
      {
        stage: "Backend API",
        tech: "Spring Boot (Java)",
        detail: "Member authentication & organizational services",
      },
      {
        stage: "Database",
        tech: "MySQL",
        detail: "Relational alumni records & event registrations",
      },
    ],
    links: {
      live: "https://alumni.iitju.edu.bd/",
    },
  },
  {
    id: "cardinal",
    index: "06",
    title: "Cardinal Tour & Travel",
    subtitle: "Travel & Tourism Digital Platform",
    category: "fullstack-web",
    role: "Frontend Developer",
    organization: "Web Engineering",
    accent: "#22d3ee",
    description:
      "Developed and optimized a responsive travel and tourism platform with modern UI and performance-focused implementation.",
    challenge:
      "Delivering fast-loading, media-rich destination showcases and smooth multi-device browsing for travelers.",
    image: cardinalImg,
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    features: [
      "Responsive travel & tour platform",
      "Modern UI/UX design system",
      "Frontend performance optimization",
      "Interactive destination & tourism features",
    ],
    architectureFlow: [
      {
        stage: "UI Architecture",
        tech: "React Components",
        detail: "Modular tour packages & interactive galleries",
      },
      {
        stage: "Styling System",
        tech: "Tailwind CSS",
        detail: "Responsive mobile-first layout & typography",
      },
      {
        stage: "Performance",
        tech: "Asset Optimization",
        detail: "Fast page loads across desktop & mobile networks",
      },
    ],
    links: {
      live: "https://cardinaltourtravel.com/",
    },
  },
  {
    id: "rwws",
    index: "07",
    title: "RWWS",
    subtitle: "NGO Organizational & Public Portal",
    category: "fullstack-web",
    role: "Frontend Developer",
    organization: "Web Engineering",
    accent: "#10b981",
    description:
      "Built and customized web solutions for organizational management and public information delivery for an NGO platform.",
    challenge:
      "Structuring accessible public information delivery and clear organizational programs for broad community reach.",
    image: rwwsImg,
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    features: [
      "Organizational management interface",
      "Accessible public information delivery",
      "Custom web component solutions",
      "Responsive NGO platform features",
    ],
    architectureFlow: [
      {
        stage: "Public Portal",
        tech: "React SPA",
        detail: "Program showcases & community initiatives",
      },
      {
        stage: "Design System",
        tech: "Tailwind CSS",
        detail: "Clean, high-contrast accessible layout",
      },
    ],
    links: {
      live: "https://www.rwws.org.bd/",
    },
  },
  {
    id: "amla-kamla",
    index: "08",
    title: "Amla Kamla",
    subtitle: "AI-Assisted Modern Web Application",
    category: "fullstack-web",
    role: "Frontend Developer",
    organization: "Rapid Product Engineering",
    accent: "#f472b6",
    description:
      "Developed a responsive modern web application using rapid prototyping and AI-assisted development workflows.",
    challenge:
      "Combining AI-augmented engineering workflows with clean React & Tailwind architecture for rapid production deployment.",
    image: amlaKamlaImg,
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    features: [
      "Responsive modern web application",
      "Clean, interactive UI design",
      "AI-assisted development workflow",
      "Rapid prototyping to production deployment",
    ],
    architectureFlow: [
      {
        stage: "Rapid Prototyping",
        tech: "AI-Augmented Workflow",
        detail: "Iterative UI & component architecture generation",
      },
      {
        stage: "Frontend Build",
        tech: "React & Tailwind CSS",
        detail: "Production-grade responsive interface deployed on Netlify",
      },
    ],
    links: {
      live: "https://amla-kamla.netlify.app/",
    },
  },
  {
    id: "portfolio",
    index: "09",
    title: "Interactive Engineering Atlas",
    subtitle: "Personal Portfolio & Digital Monograph",
    category: "fullstack-web",
    role: "Frontend Developer",
    organization: "Personal Engineering Brand",
    accent: "#e7dec8",
    description:
      "Built a personal portfolio website to showcase projects, engineering architecture, and competitive programming achievements.",
    challenge:
      "Moving beyond conventional developer portfolio templates to create a bespoke, interactive engineering atlas and editorial monograph.",
    image: myLogo,
    technologies: ["React", "Tailwind", "Framer Motion", "HTML5 Canvas"],
    features: [
      "Interactive HTML5 Canvas engineering constellation",
      "Split-stage interactive project case studies",
      "3,500+ competitive programming monument",
      "Inline YouTube screening room & editorial index",
    ],
    architectureFlow: [
      {
        stage: "Interactive Canvas",
        tech: "HTML5 2D Physics",
        detail: "Real-time node topology & cursor parallax",
      },
      {
        stage: "Motion System",
        tech: "Framer Motion + React",
        detail: "Coherent chapter transitions & case study state",
      },
    ],
    links: {
      live: "https://mdsahal.netlify.app/",
    },
  },
];

const Work = ({ darkMode, selectedProjectId, onSelectProjectId }) => {
  const [filter, setFilter] = useState("all");
  const [activeLens, setActiveLens] = useState("overview"); // "overview" | "architecture" | "preview"

  const filteredProjects = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const activeProject = useMemo(() => {
    const found = filteredProjects.find((p) => p.id === selectedProjectId);
    return found || filteredProjects[0] || PROJECTS[0];
  }, [filteredProjects, selectedProjectId]);

  const handleSelectProject = (id) => {
    if (onSelectProjectId) {
      onSelectProjectId(id);
    }
  };

  return (
    <section
      className={`py-28 px-4 sm:px-6 lg:px-10 border-b transition-colors ${
        darkMode
          ? "bg-[#06060a] border-white/[0.08]"
          : "bg-[#f1ede6] border-black/[0.08]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Chapter Header — Editorial Monograph Style */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-current/10">
          <div className="space-y-3">
            <div className="font-tech-mono text-xs uppercase tracking-[0.22em] text-[#e7dec8] opacity-80">
              CHAPTER 01 // INTERACTIVE CASE STUDIES (09)
            </div>
            <h2 className="font-architectural text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.04]">
              Selected{" "}
              <span className="font-editorial-serif italic font-normal champagne-accent-text">
                Engineering
              </span>{" "}
              Works.
            </h2>
          </div>

          {/* Domain Filter Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "All Systems (09)" },
              { id: "backend-ai", label: "AI & Enterprise Backend" },
              { id: "fullstack-web", label: "Full-Stack & Web" },
              { id: "ios", label: "Native iOS (SwiftUI)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id);
                  const nextList =
                    tab.id === "all"
                      ? PROJECTS
                      : PROJECTS.filter((p) => p.category === tab.id);
                  if (nextList.length > 0) {
                    handleSelectProject(nextList[0].id);
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition ${
                  filter === tab.id
                    ? darkMode
                      ? "bg-[#e7dec8] text-black border-[#e7dec8]"
                      : "bg-[#141413] text-white border-[#141413]"
                    : darkMode
                    ? "bg-transparent text-zinc-400 border-white/15 hover:text-white hover:border-white/35"
                    : "bg-transparent text-zinc-700 border-black/15 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Split-Stage Case Study Theater */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-10 items-start">
          {/* Left Column (4 Cols): Numbered Architectural Project Index */}
          <div className="lg:col-span-4 divide-y divide-current/10 border-t border-b border-current/10">
            {filteredProjects.map((project) => {
              const isSelected = activeProject.id === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => handleSelectProject(project.id)}
                  className={`w-full text-left py-4 px-3 transition-all duration-300 flex items-center justify-between gap-3 group ${
                    isSelected
                      ? darkMode
                        ? "bg-white/[0.06]"
                        : "bg-black/[0.06]"
                      : "hover:pl-5"
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span
                      className="font-tech-mono text-xs mt-1 shrink-0"
                      style={{
                        color: isSelected ? project.accent : undefined,
                        opacity: isSelected ? 1 : 0.45,
                      }}
                    >
                      {project.index}
                    </span>
                    <div className="min-w-0">
                      <div
                        className={`font-architectural font-bold text-base sm:text-lg truncate transition ${
                          isSelected
                            ? darkMode
                              ? "text-white"
                              : "text-black"
                            : darkMode
                            ? "text-zinc-400 group-hover:text-zinc-100"
                            : "text-zinc-600 group-hover:text-black"
                        }`}
                      >
                        {project.title}
                      </div>
                      <div className="font-tech-mono text-[11px] opacity-60 truncate">
                        {project.role} · {project.technologies.slice(0, 3).join(" / ")}
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`shrink-0 transition-transform ${
                      isSelected
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                    }`}
                    style={{ color: isSelected ? project.accent : undefined }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column (8 Cols): Interactive Case Study Stage */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                {/* Top Case Study Title & Lens Bar */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 font-tech-mono text-xs">
                      <span
                        className="px-2.5 py-0.5 rounded-full font-semibold"
                        style={{
                          backgroundColor: `${activeProject.accent}20`,
                          color: activeProject.accent,
                        }}
                      >
                        CASE STUDY {activeProject.index}
                      </span>
                      <span className="opacity-60">
                        {activeProject.organization} · {activeProject.role}
                      </span>
                    </div>
                    <h3 className="font-architectural text-3xl sm:text-4xl font-bold tracking-tight mt-2">
                      {activeProject.title}{" "}
                      <span className="font-editorial-serif italic font-normal opacity-75">
                        — {activeProject.subtitle}
                      </span>
                    </h3>
                  </div>

                  {/* Live Link Button */}
                  {activeProject.links?.live &&
                    activeProject.links.live !== "#" && (
                      <a
                        href={activeProject.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-tech-mono font-semibold shrink-0 transition ${
                          darkMode
                            ? "bg-[#e7dec8] text-black hover:bg-white"
                            : "bg-[#141413] text-white hover:bg-zinc-800"
                        }`}
                      >
                        <Globe size={13} />
                        <span>Launch Live Platform</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                </div>

                {/* 3-Mode Interactive Case Study Lens Switcher */}
                <div
                  className={`inline-flex p-1 rounded-full border ${
                    darkMode
                      ? "bg-white/[0.03] border-white/10"
                      : "bg-black/[0.04] border-black/10"
                  }`}
                >
                  {[
                    {
                      id: "overview",
                      label: "01 · Case Study & Preview",
                      Icon: Layers,
                    },
                    {
                      id: "architecture",
                      label: "02 · System Architecture",
                      Icon: Cpu,
                    },
                    {
                      id: "preview",
                      label: "03 · Full Visual Inspection",
                      Icon: Eye,
                    },
                  ].map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveLens(id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                        activeLens === id
                          ? darkMode
                            ? "bg-white text-black font-semibold"
                            : "bg-black text-white font-semibold"
                          : "opacity-65 hover:opacity-100"
                      }`}
                    >
                      <Icon size={13} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>

                {/* LENS 1: OVERVIEW & APPLICATION STAGE */}
                {activeLens === "overview" && (
                  <div className="space-y-8">
                    {/* Framed Application Preview with Ambient Color Bleed */}
                    <div
                      className={`relative rounded-[28px] overflow-hidden border p-3 sm:p-5 ${
                        darkMode
                          ? "bg-[#0c0c12] border-white/15"
                          : "bg-white border-black/10 shadow-xl"
                      }`}
                    >
                      <div
                        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-48 rounded-full blur-3xl opacity-25"
                        style={{ backgroundColor: activeProject.accent }}
                      />

                      {/* Browser / App Window Chrome */}
                      <div className="relative rounded-2xl overflow-hidden border border-current/10 bg-black">
                        <div className="px-4 py-2.5 bg-[#121218] border-b border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          <span className="font-tech-mono text-[10px] text-zinc-400">
                            {activeProject.links?.live &&
                            activeProject.links.live !== "#"
                              ? activeProject.links.live
                              : `${activeProject.id}.internal.production`}
                          </span>
                          <span className="font-tech-mono text-[10px] text-zinc-500">
                            {activeProject.role}
                          </span>
                        </div>
                        <div className="relative aspect-[16/9] max-h-[380px] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
                          <img
                            src={activeProject.image}
                            alt={activeProject.title}
                            className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Narrative Grid: Challenge, Responsibilities & Verified Stack */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
                      <div className="md:col-span-7 space-y-5">
                        <div>
                          <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">
                            SYSTEM CONTEXT &amp; OVERVIEW
                          </div>
                          <p
                            className={`text-base leading-relaxed ${
                              darkMode ? "text-zinc-300" : "text-zinc-800"
                            }`}
                          >
                            {activeProject.description}
                          </p>
                        </div>

                        <div>
                          <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">
                            ENGINEERING FOCUS
                          </div>
                          <p
                            className={`text-sm leading-relaxed ${
                              darkMode ? "text-zinc-400" : "text-zinc-600"
                            }`}
                          >
                            {activeProject.challenge}
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-5 space-y-5 border-t md:border-t-0 md:border-l border-current/10 pt-5 md:pt-0 md:pl-6">
                        <div>
                          <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50 mb-3">
                            KEY DELIVERABLES
                          </div>
                          <ul className="space-y-2">
                            {activeProject.features.map((feat, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs sm:text-sm"
                              >
                                <CheckCircle2
                                  size={15}
                                  className="mt-0.5 shrink-0"
                                  style={{ color: activeProject.accent }}
                                />
                                <span
                                  className={
                                    darkMode ? "text-zinc-300" : "text-zinc-700"
                                  }
                                >
                                  {feat}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50 mb-2">
                            PRODUCTION STACK
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProject.technologies.map((tech) => (
                              <span
                                key={tech}
                                className={`px-3 py-1 rounded-full font-tech-mono text-xs border ${
                                  darkMode
                                    ? "bg-white/[0.04] border-white/15 text-zinc-200"
                                    : "bg-black/[0.04] border-black/15 text-zinc-800"
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LENS 2: SYSTEM ARCHITECTURE & VERIFIED DATA FLOW */}
                {activeLens === "architecture" && (
                  <div
                    className={`rounded-[28px] p-6 sm:p-8 border space-y-8 ${
                      darkMode
                        ? "bg-[#0b0b12] border-white/15"
                        : "bg-white border-black/10 shadow-xl"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-current/10 pb-4">
                      <div>
                        <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-60">
                          VERIFIED ARCHITECTURAL FLOW
                        </div>
                        <h4 className="font-architectural text-xl font-bold mt-1">
                          {activeProject.title} — Component Topology
                        </h4>
                      </div>
                      <span className="font-tech-mono text-xs opacity-70">
                        Role: {activeProject.role}
                      </span>
                    </div>

                    {/* Interactive Architectural Flow Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {activeProject.architectureFlow.map((node, i) => (
                        <div
                          key={i}
                          className={`p-5 rounded-2xl border relative flex flex-col justify-between ${
                            darkMode
                              ? "bg-white/[0.03] border-white/10"
                              : "bg-black/[0.02] border-black/10"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between font-tech-mono text-[10px] opacity-60">
                              <span>STAGE 0{i + 1}</span>
                              <span>{node.stage}</span>
                            </div>
                            <div
                              className="font-architectural text-lg font-bold mt-2"
                              style={{ color: activeProject.accent }}
                            >
                              {node.tech}
                            </div>
                            <p
                              className={`text-xs mt-2 leading-relaxed ${
                                darkMode ? "text-zinc-400" : "text-zinc-600"
                              }`}
                            >
                              {node.detail}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-current/10 font-tech-mono text-[10px] opacity-50">
                            {i < activeProject.architectureFlow.length - 1
                              ? "──► Feeds Next Layer"
                              : "● Production Output"}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl border border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-xs opacity-80">
                        <strong>Engineering Challenge:</strong>{" "}
                        {activeProject.challenge}
                      </div>
                      <button
                        onClick={() => setActiveLens("overview")}
                        className="font-tech-mono text-xs underline shrink-0"
                      >
                        Back to Visual Overview
                      </button>
                    </div>
                  </div>
                )}

                {/* LENS 3: FULL VISUAL INSPECTION */}
                {activeLens === "preview" && (
                  <div
                    className={`rounded-[28px] overflow-hidden border p-4 ${
                      darkMode
                        ? "bg-[#0b0b12] border-white/15"
                        : "bg-white border-black/10 shadow-xl"
                    }`}
                  >
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-auto rounded-2xl object-contain max-h-[600px] mx-auto"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
