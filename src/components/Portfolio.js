import { useState, useEffect, useCallback } from "react";
import { Link, scroller } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./Home";
import Experience from "./Experience";
import Skills from "./Skills";
import Achievements from "./Achievements";
import Work from "./Work";
import Education from "./Education";
import Blog from "./Blog";
import Videos from "./Videos";
import Contact from "./Contact";
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowUp,
  Command,
  Search,
  ArrowUpRight,
  Download,
} from "lucide-react";
import myLogo from "../assets/optimized/myLogo.jpeg";

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("omnizia");

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setShowScrollTop(y > 600);
      setScrollProgress(Math.min(100, Math.max(0, (y / max) * 100)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setCmdOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const sections = [
    { id: "home", label: "Atlas", code: "00" },
    { id: "work", label: "Selected Works", code: "01" },
    { id: "experience", label: "Journey", code: "02" },
    { id: "achievements", label: "3,500+ Algorithms", code: "03" },
    { id: "skills", label: "Capabilities", code: "04" },
    { id: "education", label: "Pedigree", code: "05" },
    { id: "videos", label: "Screening Room", code: "06" },
    { id: "blog", label: "Essays", code: "07" },
    { id: "contact", label: "Connect", code: "08" },
  ];

  const handleNavigateToProject = useCallback((projectId) => {
    setSelectedProjectId(projectId);
    scroller.scrollTo("work", {
      duration: 700,
      smooth: "easeInOutQuart",
      offset: -40,
    });
  }, []);

  const handleNavigateToSection = useCallback((sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 700,
      smooth: "easeInOutQuart",
      offset: -30,
    });
    setCmdOpen(false);
    setIsOpen(false);
  }, []);

  const quickCommands = [
    {
      title: "Omnizia — Medical Data Intelligence Platform",
      category: "Case Study",
      action: () => {
        setCmdOpen(false);
        handleNavigateToProject("omnizia");
      },
    },
    {
      title: "City Remit — Cross-Border FinTech Remittance",
      category: "Case Study",
      action: () => {
        setCmdOpen(false);
        handleNavigateToProject("city-remit");
      },
    },
    {
      title: "Convay — Enterprise Video Conferencing",
      category: "Case Study",
      action: () => {
        setCmdOpen(false);
        handleNavigateToProject("convay");
      },
    },
    {
      title: "Butterfly Group Bangladesh — Native SwiftUI iOS App",
      category: "Case Study",
      action: () => {
        setCmdOpen(false);
        handleNavigateToProject("butterfly");
      },
    },
    {
      title: "3,500+ Competitive Programming Monument (Codeforces 1694)",
      category: "Section",
      action: () => handleNavigateToSection("achievements"),
    },
    {
      title: "Career Journey — Brain Station 23 & Synesis IT",
      category: "Section",
      action: () => handleNavigateToSection("experience"),
    },
    {
      title: "The Screening Room — YouTube Documentaries (@me__sahal)",
      category: "Section",
      action: () => handleNavigateToSection("videos"),
    },
    {
      title: "Download Official Resume (Md_Sahal_Resume.pdf)",
      category: "Document",
      action: () => {
        setCmdOpen(false);
        window.open("/resume.pdf", "_blank");
      },
    },
    {
      title: darkMode
        ? "Switch to Warm Alabaster Light Theme"
        : "Switch to Obsidian Titanium Dark Theme",
      category: "Appearance",
      action: () => {
        setDarkMode((d) => !d);
        setCmdOpen(false);
      },
    },
  ];

  const filteredCommands = quickCommands.filter(
    (item) =>
      item.title.toLowerCase().includes(cmdQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(cmdQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-500 selection:bg-[#e7dec8] selection:text-black ${
        darkMode
          ? "spatial-atmosphere-dark text-[#f5f5f7]"
          : "spatial-atmosphere-light text-[#141413]"
      }`}
    >
      {/* Top Optical Reading Progress Hairline */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#e7dec8] via-cyan-400 to-[#e7dec8] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Spatial Navigation Capsule */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none flex justify-center">
        <motion.nav
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto max-w-6xl w-full rounded-full px-3 sm:px-4 py-2 backdrop-blur-2xl border transition-all duration-300 flex items-center justify-between gap-2 ${
            darkMode
              ? "bg-[#0a0a0f]/80 border-white/[0.11] shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
              : "bg-[#fffdf9]/85 border-black/[0.09] shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
          }`}
        >
          {/* Left Identity Anchor */}
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={600}
            className="flex items-center gap-2.5 cursor-pointer group pr-2"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#e7dec8]/50 shrink-0">
              <img
                src={myLogo}
                alt="Md Sahal"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-architectural font-bold text-sm tracking-tight leading-none">
                Md Sahal
              </span>
              <span
                className={`font-tech-mono text-[10px] tracking-wider mt-0.5 ${
                  darkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                SWE I · BS23
              </span>
            </div>
          </Link>

          {/* Center Chapter Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {sections.map(({ id, label, code }) => (
              <Link
                key={id}
                to={id}
                spy={true}
                smooth={true}
                offset={-30}
                duration={600}
                activeClass={
                  darkMode
                    ? "!text-white bg-white/[0.09] border-white/15"
                    : "!text-black bg-black/[0.07] border-black/15"
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border border-transparent transition-all duration-200 flex items-center gap-1.5 ${
                  darkMode
                    ? "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.04]"
                }`}
              >
                <span className="font-tech-mono text-[9px] opacity-50">
                  {code}
                </span>
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Right Utility Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCmdOpen(true)}
              className={`px-2.5 py-1.5 rounded-full text-xs font-tech-mono border transition flex items-center gap-1.5 ${
                darkMode
                  ? "bg-white/[0.04] hover:bg-white/[0.09] border-white/10 text-zinc-300"
                  : "bg-black/[0.04] hover:bg-black/[0.08] border-black/10 text-zinc-700"
              }`}
              title="Open Quick Navigation (⌘K)"
            >
              <Command size={12} />
              <span className="hidden sm:inline text-[11px]">Index</span>
              <span className="text-[10px] opacity-60 hidden md:inline">⌘K</span>
            </button>

            <a
              href="/resume.pdf"
              download="Md_Sahal_Resume.pdf"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                darkMode
                  ? "bg-[#e7dec8] text-black hover:bg-[#f5efe0]"
                  : "bg-[#141413] text-[#fffdf9] hover:bg-zinc-800"
              }`}
            >
              <Download size={12} />
              <span>CV</span>
            </a>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full border transition ${
                darkMode
                  ? "bg-white/[0.04] hover:bg-white/[0.1] border-white/10 text-[#e7dec8]"
                  : "bg-black/[0.04] hover:bg-black/[0.08] border-black/10 text-zinc-800"
              }`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-full border transition ${
                darkMode
                  ? "bg-white/[0.04] border-white/10 text-zinc-200"
                  : "bg-black/[0.04] border-black/10 text-zinc-800"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className={`fixed top-20 left-4 right-4 z-50 rounded-3xl p-5 backdrop-blur-2xl border lg:hidden ${
              darkMode
                ? "bg-[#0d0d14]/95 border-white/15 text-white shadow-2xl"
                : "bg-[#fffdf9]/95 border-black/10 text-zinc-900 shadow-2xl"
            }`}
          >
            <div className="grid grid-cols-2 gap-2">
              {sections.map(({ id, label, code }) => (
                <button
                  key={id}
                  onClick={() => handleNavigateToSection(id)}
                  className={`text-left px-3.5 py-2.5 rounded-2xl text-xs font-medium border transition flex items-center justify-between ${
                    darkMode
                      ? "bg-white/[0.03] border-white/10 hover:bg-white/10"
                      : "bg-black/[0.03] border-black/10 hover:bg-black/10"
                  }`}
                >
                  <span>{label}</span>
                  <span className="font-tech-mono text-[10px] opacity-50">
                    {code}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⌘K Command Palette Modal */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCmdOpen(false)}
            className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-md flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-xl rounded-3xl border overflow-hidden shadow-2xl ${
                darkMode
                  ? "bg-[#0e0e14] border-white/15 text-white"
                  : "bg-[#fffdf9] border-black/15 text-zinc-900"
              }`}
            >
              <div
                className={`px-4 py-3.5 border-b flex items-center gap-3 ${
                  darkMode ? "border-white/10" : "border-black/10"
                }`}
              >
                <Search size={16} className="opacity-50" />
                <input
                  type="text"
                  autoFocus
                  value={cmdQuery}
                  onChange={(e) => setCmdQuery(e.target.value)}
                  placeholder="Jump to any system case study, section, or action..."
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
                <button
                  onClick={() => setCmdOpen(false)}
                  className="px-2 py-0.5 rounded text-[10px] font-tech-mono opacity-60 border border-current"
                >
                  ESC
                </button>
              </div>
              <div className="p-2 max-h-80 overflow-y-auto divide-y divide-white/5">
                {filteredCommands.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={cmd.action}
                    className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs flex items-center justify-between transition ${
                      darkMode
                        ? "hover:bg-white/[0.07]"
                        : "hover:bg-black/[0.06]"
                    }`}
                  >
                    <span className="font-medium">{cmd.title}</span>
                    <span className="font-tech-mono text-[10px] opacity-60 flex items-center gap-1">
                      {cmd.category}
                      <ArrowUpRight size={12} />
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Coherent Narrative Stream — Strong Visual Variation Per Chapter */}
      <main className="relative z-10">
        {/* 00. FULL-VIEWPORT INTERACTIVE ENGINEERING ATLAS HERO */}
        <div id="home">
          <Home
            darkMode={darkMode}
            onSelectProject={handleNavigateToProject}
            onSelectSection={handleNavigateToSection}
          />
        </div>

        {/* 01. INTERACTIVE CASE-STUDY STAGE (PROJECTS) */}
        <div id="work">
          <Work
            darkMode={darkMode}
            selectedProjectId={selectedProjectId}
            onSelectProjectId={setSelectedProjectId}
          />
        </div>

        {/* 02. OPEN ARCHITECTURAL MONOGRAPH (EXPERIENCE) */}
        <div id="experience">
          <Experience darkMode={darkMode} />
        </div>

        {/* 03. THE 3,500+ ALGORITHMIC MONUMENT & FIELD DOCUMENTARY */}
        <div id="achievements">
          <Achievements darkMode={darkMode} />
        </div>

        {/* 04. INTERACTIVE CAPABILITY & PRODUCTION ECOSYSTEM MATRIX */}
        <div id="skills">
          <Skills
            darkMode={darkMode}
            onSelectProject={handleNavigateToProject}
          />
        </div>

        {/* 05. ACADEMIC PEDIGREE COLOPHON */}
        <div id="education">
          <Education darkMode={darkMode} />
        </div>

        {/* 06. THE STORYTELLER'S SCREENING ROOM (YOUTUBE CINEMA) */}
        <div id="videos">
          <Videos darkMode={darkMode} />
        </div>

        {/* 07. THE EDITORIAL ESSAY INDEX (BLOG) */}
        <div id="blog">
          <Blog darkMode={darkMode} />
        </div>

        {/* 08. DIRECT ARCHITECTURAL CONNECTION (CONTACT) */}
        <div id="contact">
          <Contact darkMode={darkMode} />
        </div>
      </main>

      {/* Minimalist Scroll-to-Top Trigger */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Link to="home" spy={true} smooth={true} duration={600}>
              <button
                className={`w-11 h-11 rounded-full border backdrop-blur-xl flex items-center justify-center transition hover:scale-105 ${
                  darkMode
                    ? "bg-[#111118]/90 border-white/15 text-[#e7dec8] hover:border-[#e7dec8]/50"
                    : "bg-white/90 border-black/15 text-zinc-900 shadow-lg"
                }`}
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} />
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
