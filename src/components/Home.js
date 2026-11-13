import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github as GitHub,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  Download,
  ArrowUpRight,
  Compass,
  Sparkles,
} from "lucide-react";
import XLogoB from "../assets/optimized/twitterx--v2.png";
import XLogo from "../assets/xlogo.svg";
import myLogo from "../assets/optimized/myLogo.jpeg";
import { FaWhatsapp } from "react-icons/fa";

const ATLAS_NODES = [
  {
    id: "sahal",
    label: "Md Sahal",
    sublabel: "SWE I @ Brain Station 23",
    category: "core",
    x: 0.5,
    y: 0.48,
    radius: 11,
    color: "#e7dec8",
    organization: "Brain Station 23 PLC. · IIT, Jahangirnagar University",
    headline: "The Polymath Engineer: Systems, Algorithms & Storytelling",
    summary:
      "Software Engineer I building enterprise Spring Boot & OpenAI systems, backed by 3,500+ solved algorithmic problems across 6 global judges and a passion for teaching & documentary creation.",
    tags: ["Java", "Spring Boot", "OpenAI API", "React", "3,500+ CP Solved"],
    ctaLabel: "Explore Career Journey",
    targetType: "section",
    targetId: "experience",
    connections: [
      "omnizia",
      "city-remit",
      "convay",
      "butterfly",
      "codeforces",
      "leetcode-cc",
      "ju-alumni",
      "storyteller",
    ],
  },
  {
    id: "omnizia",
    label: "Omnizia AI",
    sublabel: "Medical Intelligence",
    category: "systems",
    x: 0.24,
    y: 0.26,
    radius: 8,
    color: "#38bdf8",
    organization: "Brain Station 23 PLC. · Backend Developer",
    headline: "Omnizia — Medical Data Intelligence Platform",
    summary:
      "Developed automated Spring Batch data-processing pipelines and integrated OpenAI APIs to generate AI-driven clinical summaries and intelligent healthcare workflows.",
    tags: ["Java", "Spring Boot", "Spring Batch", "OpenAI API"],
    ctaLabel: "Open Omnizia Case Study",
    targetType: "project",
    targetId: "omnizia",
    connections: ["sahal", "city-remit"],
  },
  {
    id: "city-remit",
    label: "City Remit",
    sublabel: "Malaysia FinTech",
    category: "systems",
    x: 0.76,
    y: 0.24,
    radius: 8,
    color: "#34d399",
    organization: "Brain Station 23 PLC. · Backend Developer",
    headline: "City Remit — Cross-Border Remittance Engine",
    summary:
      "Engineered RESTful APIs, reward point systems based on transactions and referrals, and secure backend services for cross-border financial remittance operations from Malaysia.",
    tags: ["Java", "Spring Boot", "Oracle", "Vue", "RESTful APIs"],
    ctaLabel: "Open City Remit Case Study",
    targetType: "project",
    targetId: "city-remit",
    connections: ["sahal", "omnizia", "convay"],
  },
  {
    id: "convay",
    label: "Convay",
    sublabel: "Enterprise Video",
    category: "systems",
    x: 0.82,
    y: 0.54,
    radius: 7.5,
    color: "#c084fc",
    organization: "Synesis IT Ltd. · Full Stack Developer",
    headline: "Convay — Enterprise Video Conferencing Platform",
    summary:
      "Developed meeting scheduling APIs, implemented a recording alert system, and diagnosed real-time session stability issues for large-scale enterprise communication.",
    tags: ["Java", "Spring Boot", "MySQL", "React"],
    ctaLabel: "Open Convay Case Study",
    targetType: "project",
    targetId: "convay",
    connections: ["sahal", "city-remit", "ju-alumni"],
  },
  {
    id: "butterfly",
    label: "Butterfly iOS",
    sublabel: "Swift & SwiftUI",
    category: "product",
    x: 0.68,
    y: 0.78,
    radius: 7,
    color: "#fbbf24",
    organization: "Butterfly Group Bangladesh · iOS Developer",
    headline: "Butterfly Group BD — Native iOS E-Commerce App",
    summary:
      "Contributing to native iOS application development, REST API integration, SwiftUI interface implementation, and Xcode deployment workflows.",
    tags: ["Swift", "SwiftUI", "iOS", "Xcode"],
    ctaLabel: "Open Butterfly Case Study",
    targetType: "project",
    targetId: "butterfly",
    connections: ["sahal", "ju-alumni"],
  },
  {
    id: "ju-alumni",
    label: "Web Platforms",
    sublabel: "JU Alumni · Cardinal · RWWS",
    category: "product",
    x: 0.34,
    y: 0.79,
    radius: 7,
    color: "#60a5fa",
    organization: "Full-Stack & Frontend Engineering",
    headline: "JU Alumni, Cardinal Tour, RWWS & Amla Kamla",
    summary:
      "Architected responsive organizational portals, travel platforms, and AI-assisted web applications using React, Spring Boot, MySQL, and Tailwind CSS.",
    tags: ["React", "Spring Boot", "Tailwind CSS", "MySQL"],
    ctaLabel: "Inspect Web Platforms",
    targetType: "project",
    targetId: "ju-alumni",
    connections: ["sahal", "convay", "butterfly"],
  },
  {
    id: "codeforces",
    label: "Codeforces 2,750+",
    sublabel: "Max Rating 1694",
    category: "algorithms",
    x: 0.17,
    y: 0.52,
    radius: 8.5,
    color: "#22d3ee",
    organization: "Competitive Programming · Handle: @sahal",
    headline: "2,750+ Problems Solved on Codeforces (Max 1694)",
    summary:
      "Years of rigorous algorithmic problem-solving across graph theory, dynamic programming, and data structures — forming the foundation of my backend engineering.",
    tags: ["2,750+ Solved", "Max Rating 1694", "Algorithms", "Data Structures"],
    ctaLabel: "Explore 3,500+ Monument",
    targetType: "section",
    targetId: "achievements",
    connections: ["sahal", "leetcode-cc", "storyteller"],
  },
  {
    id: "leetcode-cc",
    label: "IUPC & Judges",
    sublabel: "#11th MBSTU · LC 1747",
    category: "algorithms",
    x: 0.28,
    y: 0.66,
    radius: 7,
    color: "#f59e0b",
    organization: "National Onsite Contests & Global Judges",
    headline: "Ranked #11th MBSTU IDPC · #35th RUET · #42nd AUST",
    summary:
      "Solved 250+ on LeetCode (Max 1747), CodeChef (Max 1759), 200+ on AtCoder, 150+ on UVa, and 100+ on LightOJ alongside top national onsite IUPC placements.",
    tags: ["MBSTU #11th", "RUET #35th", "LeetCode 1747", "CodeChef 1759"],
    ctaLabel: "View Contest Gallery",
    targetType: "section",
    targetId: "achievements",
    connections: ["sahal", "codeforces"],
  },
  {
    id: "storyteller",
    label: "Educator & Creator",
    sublabel: "YouTube & BdOSN",
    category: "story",
    x: 0.52,
    y: 0.19,
    radius: 7,
    color: "#fb7185",
    organization: "BdOSN Camp Instructor · YouTube (@me__sahal)",
    headline: "Mentoring 100+ Students & Documentary Storytelling",
    summary:
      "Mentored 100+ students in algorithms at BdOSN Girls Programming Camp, created 10+ YouTube documentaries on ICPC, IOI, space & history, and authored 10+ tech essays.",
    tags: ["100+ Mentored", "YouTube @me__sahal", "Technical Writing"],
    ctaLabel: "Enter Screening Room",
    targetType: "section",
    targetId: "videos",
    connections: ["sahal", "codeforces"],
  },
];

const Home = ({ darkMode, onSelectProject, onSelectSection }) => {
  const [activeNodeId, setActiveNodeId] = useState("omnizia");
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const nodesScreenRef = useRef([]);

  const activeNode = useMemo(
    () =>
      ATLAS_NODES.find((n) => n.id === (hoveredNodeId || activeNodeId)) ||
      ATLAS_NODES[0],
    [activeNodeId, hoveredNodeId]
  );

  const socialLinks = [
    {
      icon: <Linkedin size={16} />,
      href: "https://www.linkedin.com/in/me-sahal/",
      label: "LinkedIn",
    },
    {
      icon: <GitHub size={16} />,
      href: "https://github.com/mesahal",
      label: "GitHub",
    },
    {
      icon: <Mail size={16} />,
      href: "mailto:mdsahal.info@gmail.com",
      label: "Email",
    },
    {
      icon: <Youtube size={16} />,
      href: "https://www.youtube.com/@me__sahal",
      label: "YouTube",
    },
    {
      icon: (
        <img
          src={darkMode ? XLogoB : XLogo}
          alt="X"
          className="w-3.5 h-3.5 object-contain"
        />
      ),
      href: "https://twitter.com/me__sahal",
      label: "X",
    },
    {
      icon: <Facebook size={16} />,
      href: "https://www.facebook.com/memdsahal",
      label: "Facebook",
    },
    {
      icon: <Instagram size={16} />,
      href: "https://www.instagram.com/me_md_sahal",
      label: "Instagram",
    },
    {
      icon: <FaWhatsapp size={16} />,
      href: "https://whatsapp.com/channel/0029VapIAQjKgsO1w66ao52d",
      label: "WhatsApp",
    },
  ];

  // Interactive Constellation Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      time += 0.012;
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      ctx.clearRect(0, 0, w, h);

      const mx = (mouseRef.current.x - 0.5) * 28;
      const my = (mouseRef.current.y - 0.5) * 28;
      const currentFocusId = hoveredNodeId || activeNodeId;

      // Compute node screen coordinates with gentle orbital breathing + mouse parallax
      const computedNodes = ATLAS_NODES.map((node, index) => {
        const depth = node.id === "sahal" ? 0.35 : 0.75 + (index % 3) * 0.2;
        const floatX = Math.sin(time + index * 1.1) * 6;
        const floatY = Math.cos(time * 0.9 + index * 1.4) * 6;
        const sx = node.x * w + floatX - mx * depth;
        const sy = node.y * h + floatY - my * depth;
        const isDimmed =
          activeFilter !== "all" &&
          node.category !== activeFilter &&
          node.id !== "sahal";
        return {
          ...node,
          sx,
          sy,
          isDimmed,
        };
      });

      nodesScreenRef.current = computedNodes;
      const nodeMap = Object.fromEntries(computedNodes.map((n) => [n.id, n]));
      const focusedNode = nodeMap[currentFocusId] || nodeMap["sahal"];

      // Subtle orbital reference rings around nexus
      const nexus = nodeMap["sahal"];
      if (nexus) {
        [110, 210, 310].forEach((r, idx) => {
          ctx.beginPath();
          ctx.arc(nexus.sx, nexus.sy, r, 0, Math.PI * 2);
          ctx.strokeStyle = darkMode
            ? `rgba(231, 222, 200, ${0.035 - idx * 0.008})`
            : `rgba(20, 20, 19, ${0.045 - idx * 0.01})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      // Draw constellation filaments
      computedNodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = nodeMap[targetId];
          if (!target) return;
          const isHighlighted =
            node.id === currentFocusId || target.id === currentFocusId;

          ctx.beginPath();
          ctx.moveTo(node.sx, node.sy);
          ctx.lineTo(target.sx, target.sy);

          if (isHighlighted) {
            ctx.strokeStyle = darkMode
              ? "rgba(231, 222, 200, 0.38)"
              : "rgba(20, 20, 19, 0.35)";
            ctx.lineWidth = 1.4;
          } else {
            ctx.strokeStyle = darkMode
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(0, 0, 0, 0.06)";
            ctx.lineWidth = 0.8;
          }
          ctx.stroke();

          // Animated optical pulse along highlighted connections
          if (isHighlighted) {
            const pulseT = (time * 0.65) % 1;
            const px = node.sx + (target.sx - node.sx) * pulseT;
            const py = node.sy + (target.sy - node.sy) * pulseT;
            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = focusedNode.color;
            ctx.fill();
          }
        });
      });

      // Draw each node + orbital reticle + typography
      computedNodes.forEach((node) => {
        const isFocused = node.id === currentFocusId;
        const alpha = node.isDimmed ? 0.25 : 1;

        ctx.save();
        ctx.globalAlpha = alpha;

        // Outer target reticle if focused
        if (isFocused) {
          ctx.beginPath();
          ctx.arc(
            node.sx,
            node.sy,
            node.radius + 11 + Math.sin(time * 3) * 2,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Soft halo
        ctx.beginPath();
        ctx.arc(node.sx, node.sy, node.radius + 5, 0, Math.PI * 2);
        ctx.fillStyle = isFocused
          ? `${node.color}33`
          : darkMode
          ? "rgba(255,255,255,0.04)"
          : "rgba(0,0,0,0.04)";
        ctx.fill();

        // Core node sphere
        ctx.beginPath();
        ctx.arc(node.sx, node.sy, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isFocused
          ? node.color
          : darkMode
          ? "#181820"
          : "#ffffff";
        ctx.strokeStyle = node.color;
        ctx.lineWidth = isFocused ? 2.5 : 1.6;
        ctx.fill();
        ctx.stroke();

        // Label next to node
        ctx.font = `${isFocused ? "600" : "500"} 11px "JetBrains Mono", monospace`;
        ctx.fillStyle = isFocused
          ? darkMode
            ? "#ffffff"
            : "#000000"
          : darkMode
          ? "rgba(245,245,247,0.78)"
          : "rgba(20,20,19,0.78)";
        ctx.fillText(node.label, node.sx + node.radius + 8, node.sy + 3);

        ctx.restore();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [activeNodeId, hoveredNodeId, activeFilter, darkMode]);

  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = {
      x: x / (rect.width || 1),
      y: y / (rect.height || 1),
      active: true,
    };

    // Hit test nodes
    const hit = nodesScreenRef.current.find((n) => {
      const dx = n.sx - x;
      const dy = n.sy - y;
      return Math.sqrt(dx * dx + dy * dy) < n.radius + 18;
    });

    setHoveredNodeId(hit ? hit.id : null);
    canvas.style.cursor = hit ? "pointer" : "crosshair";
  };

  const handleCanvasClick = () => {
    if (hoveredNodeId) {
      setActiveNodeId(hoveredNodeId);
    }
  };

  const handleTriggerNodeAction = (node) => {
    if (node.targetType === "project" && onSelectProject) {
      onSelectProject(node.targetId);
    } else if (node.targetType === "section" && onSelectSection) {
      onSelectSection(node.targetId);
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-10 flex flex-col justify-between overflow-hidden border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between gap-10">
        {/* Top Row: Asymmetric Monumental Identity + Interactive Atlas Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center flex-1">
          {/* Left Column (6 Cols): Authentic Human Identity & Expressive Typography */}
          <div className="lg:col-span-6 space-y-6 relative z-20">
            {/* Personal Greeting & Institutional Coordinates */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className={`inline-flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 rounded-full border text-xs font-tech-mono ${
                  darkMode
                    ? "bg-white/[0.03] border-[#e7dec8]/30 text-[#e7dec8]"
                    : "bg-black/[0.04] border-black/15 text-zinc-800"
                }`}
              >
                <img
                  src={myLogo}
                  alt="Md Sahal"
                  className="w-6 h-6 rounded-full object-cover border border-[#e7dec8]/40"
                />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>As-salamu alaykum · I am Md Sahal</span>
              </div>
              <span
                className={`font-tech-mono text-[11px] uppercase tracking-widest ${
                  darkMode ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                Dhaka, BD · IIT JU
              </span>
            </div>

            {/* Expressive Multi-Font Editorial Headline */}
            <div className="space-y-2">
              <h1
                className={`font-architectural text-4xl sm:text-6xl xl:text-[64px] font-bold tracking-[-0.04em] leading-[1.02] ${
                  darkMode ? "text-white" : "text-[#141413]"
                }`}
              >
                Engineering{" "}
                <span className="font-editorial-serif italic font-normal champagne-accent-text pr-1">
                  intelligent
                </span>{" "}
                systems.
                <br />
                <span
                  className={
                    darkMode ? "text-zinc-300" : "text-zinc-700"
                  }
                >
                  Solving{" "}
                </span>
                <span className="font-editorial-serif italic font-normal text-cyan-400">
                  3,500+
                </span>{" "}
                puzzles.
              </h1>
            </div>

            {/* Coherent Personal Narrative (100% Real, Verified Facts) */}
            <p
              className={`text-base sm:text-lg leading-relaxed max-w-xl ${
                darkMode ? "text-zinc-400" : "text-zinc-700"
              }`}
            >
              Software Engineer I at{" "}
              <strong
                className={
                  darkMode ? "text-white font-medium" : "text-black font-semibold"
                }
              >
                Brain Station 23 PLC.
              </strong>{" "}
              architecting{" "}
              <span className={darkMode ? "text-zinc-200" : "text-zinc-900"}>
                50+ enterprise RESTful APIs
              </span>{" "}
              and{" "}
              <span className={darkMode ? "text-zinc-200" : "text-zinc-900"}>
                Omnizia’s OpenAI + Spring Batch medical intelligence platform
              </span>
              — grounded in competitive programming rigor (
              <span className="font-tech-mono text-xs text-cyan-400">
                Codeforces 1694 · LeetCode 1747
              </span>
              ) and documentary storytelling.
            </p>

            {/* Constellation Lens Filter Bar */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 font-tech-mono text-[10px] uppercase tracking-[0.18em] opacity-60">
                <Compass size={12} />
                <span>Interactive Engineering Atlas — Filter or Click Any Node</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "All Work (9 Nodes)" },
                  { id: "systems", label: "Enterprise & AI" },
                  { id: "algorithms", label: "3,500+ Algorithms" },
                  { id: "product", label: "Web & SwiftUI iOS" },
                  { id: "story", label: "Educator & Media" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                      activeFilter === tab.id
                        ? darkMode
                          ? "bg-[#e7dec8] text-black border-[#e7dec8]"
                          : "bg-[#141413] text-white border-[#141413]"
                        : darkMode
                        ? "bg-white/[0.03] text-zinc-400 border-white/10 hover:text-white hover:border-white/25"
                        : "bg-black/[0.03] text-zinc-700 border-black/10 hover:text-black"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Socials & Resume Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="/resume.pdf"
                download="Md_Sahal_Resume.pdf"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase transition ${
                  darkMode
                    ? "bg-white text-black hover:bg-[#e7dec8]"
                    : "bg-[#141413] text-white hover:bg-zinc-800"
                }`}
              >
                <Download size={14} />
                <span>Download Resume</span>
              </a>

              <div className="flex flex-wrap items-center gap-1.5">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className={`w-9 h-9 rounded-full border flex items-center justify-center transition hover:scale-110 ${
                      darkMode
                        ? "bg-white/[0.03] border-white/10 text-zinc-300 hover:text-[#e7dec8] hover:border-[#e7dec8]/40"
                        : "bg-black/[0.03] border-black/10 text-zinc-700 hover:text-black"
                    }`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (6 Cols): Interactive Constellation Map + Node Inspector */}
          <div className="lg:col-span-6 flex flex-col gap-4 relative z-20">
            {/* Interactive Canvas Stage */}
            <div
              className={`relative w-full h-[360px] sm:h-[420px] rounded-[28px] border overflow-hidden transition-colors ${
                darkMode
                  ? "bg-[#07070c]/90 border-white/[0.12] shadow-[0_30px_80px_rgba(0,0,0,0.85)]"
                  : "bg-[#ffffff]/85 border-black/[0.1] shadow-xl"
              }`}
            >
              {/* Top Canvas HUD Header */}
              <div className="absolute top-3.5 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                <span className="font-tech-mono text-[10px] uppercase tracking-widest opacity-60">
                  LIVE WORK TOPOLOGY · CLICK ANY NODE TO INSPECT
                </span>
                <span className="font-tech-mono text-[10px] px-2 py-0.5 rounded-full border border-current opacity-70">
                  {activeNode.label}
                </span>
              </div>

              <canvas
                ref={canvasRef}
                onMouseMove={handleCanvasMouseMove}
                onClick={handleCanvasClick}
                className="w-full h-full block"
              />

              {/* Quick Node Selector Pills at Bottom of Canvas for Effortless Clicking */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
                {ATLAS_NODES.map((node) => {
                  const isSelected = activeNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveNodeId(node.id)}
                      className={`px-2.5 py-1 rounded-full font-tech-mono text-[10px] shrink-0 border transition flex items-center gap-1.5 ${
                        isSelected
                          ? darkMode
                            ? "bg-white text-black border-white font-semibold"
                            : "bg-black text-white border-black font-semibold"
                          : darkMode
                          ? "bg-black/60 text-zinc-300 border-white/15 hover:border-white/40 backdrop-blur-md"
                          : "bg-white/80 text-zinc-700 border-black/15 hover:border-black/40 backdrop-blur-md"
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: node.color }}
                      />
                      <span>{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Node Live Dossier Drawer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className={`rounded-3xl p-5 border backdrop-blur-xl ${
                  darkMode
                    ? "bg-[#0c0c14]/90 border-white/15"
                    : "bg-white/90 border-black/10 shadow-lg"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-current/10">
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={14}
                      style={{ color: activeNode.color }}
                      className="shrink-0"
                    />
                    <span className="font-tech-mono text-[11px] uppercase tracking-wider opacity-75">
                      {activeNode.organization}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTriggerNodeAction(activeNode)}
                    className="inline-flex items-center gap-1 font-tech-mono text-xs font-semibold text-cyan-400 hover:underline"
                  >
                    <span>{activeNode.ctaLabel}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-3">
                  {activeNode.headline}
                </h2>
                <p
                  className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                    darkMode ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {activeNode.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {activeNode.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-0.5 rounded-full font-tech-mono text-[10px] border ${
                        darkMode
                          ? "bg-white/[0.04] border-white/10 text-zinc-300"
                          : "bg-black/[0.04] border-black/10 text-zinc-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Architectural Ledger Strip (No Boxed Cards — Pure Typographic Scale) */}
        <div
          className={`pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-6 ${
            darkMode ? "border-white/10" : "border-black/10"
          }`}
        >
          <div>
            <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50">
              01 / ALGORITHMIC RIGOR
            </div>
            <div className="font-editorial-serif italic text-3xl sm:text-4xl mt-1">
              3,500+ Solved
            </div>
            <div className="font-tech-mono text-[11px] opacity-70 mt-0.5">
              Codeforces 1694 · LeetCode 1747
            </div>
          </div>

          <div>
            <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50">
              02 / PRODUCTION APIS
            </div>
            <div className="font-editorial-serif italic text-3xl sm:text-4xl mt-1">
              50+ RESTful APIs
            </div>
            <div className="font-tech-mono text-[11px] opacity-70 mt-0.5">
              Spring Boot · Oracle · Batch
            </div>
          </div>

          <div>
            <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50">
              03 / SHIPPED PLATFORMS
            </div>
            <div className="font-editorial-serif italic text-3xl sm:text-4xl mt-1">
              9 Live Systems
            </div>
            <div className="font-tech-mono text-[11px] opacity-70 mt-0.5">
              Medical AI · FinTech · Video · iOS
            </div>
          </div>

          <div>
            <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50">
              04 / COMMUNITY &amp; MEDIA
            </div>
            <div className="font-editorial-serif italic text-3xl sm:text-4xl mt-1">
              100+ Mentored
            </div>
            <div className="font-tech-mono text-[11px] opacity-70 mt-0.5">
              BdOSN Instructor · YouTube Creator
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
