import { useState, useEffect, useMemo } from "react";
import {
  Mail,
  Github as GitHub,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  Terminal,
  Code2,
  Binary,
  Cpu,
  Download,
} from "lucide-react";
import { useTypingEffect } from "../components/hooks/useTypingEffect";
import XLogoB from "../assets/optimized/twitterx--v2.png";
import XLogo from "../assets/xlogo.svg";
import myLogo from "../assets/optimized/myLogo.jpeg";
import { FaWhatsapp } from "react-icons/fa";

const Home = ({ darkMode }) => {
  const greeting = useTypingEffect("As-salamu alaykum", 100);
  const name = useTypingEffect("Sahal", 100);
  const [showRoles, setShowRoles] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const roles = useMemo(() => [
    { text: "Software Engineer", color: "text-purple-400" },
    { text: "Content Creator", color: "text-blue-400" }, // New color
    { text: "Problem Solver", color: "text-pink-400" },
    { text: "Full-Stack Web Developer", color: "text-green-400" }, // New color
    { text: "Competitive Programmer", color: "text-red-400" },
    { text: "Programming Trainer", color: "text-yellow-400" }, // New color
  ], []);

  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeoutId;
    const typeText = () => {
      const targetText = roles[currentIndex].text;
      if (isTyping === true && currentText.length < targetText.length) {
        setCurrentText(targetText.slice(0, currentText.length + 1));
        timeoutId = setTimeout(typeText, 2000);
      } else {
        setIsTyping(false);
      }
    };

    const startErasing = () => {
      setCurrentText((prevText) => {
        if (prevText.length > 0) {
          setTimeout(startErasing, 50);
          return prevText.slice(0, -1);
        } else {
          setCurrentIndex((prev) => (prev + 1) % roles.length);
          setIsTyping(true);
          return "";
        }
      });
    };

    if (isTyping) {
      timeoutId = setTimeout(typeText, 100);
    } else {
      timeoutId = setTimeout(startErasing, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, currentIndex, roles, isTyping, setCurrentIndex]);

  useEffect(() => {
    if (name === "Sahal") {
      const timeout = setTimeout(() => {
        setShowRoles(true);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [name]);

  const socialLinks = [
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/me-sahal/",
      label: "LinkedIn",
      color: "text-blue-400",
    },
    {
      icon: <GitHub size={20} />,
      href: "https://github.com/mesahal",
      label: "GitHub",
      color: "text-gray-400",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:me.sahal2000@gmail.com",
      label: "Email",
      color: "text-red-400",
    },
    {
      icon: <Facebook size={20} />,
      href: "https://www.facebook.com/memdsahal",
      label: "Facebook",
      color: "text-blue-500",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/me_md_sahal",
      label: "Instagram",
      color: "text-pink-500",
    },
    {
      icon: (
        <img
          src={darkMode ? XLogoB : XLogo}
          alt="X"
          className={`${darkMode ? "w-5 h-5" : "w-5 h-5"} object-contain`}
        />
      ),
      href: "https://twitter.com/me__sahal",
      label: "Twitter",
      color: "text-sky-400",
    },
    {
      icon: <Youtube size={20} />,
      href: "https://www.youtube.com/@me__sahal",
      label: "YouTube",
      color: "text-red-500",
    },
    {
      icon: <FaWhatsapp size={20} />,
      href: "https://whatsapp.com/channel/0029VapIAQjKgsO1w66ao52d",
      label: "WhatsApp",
      color: "text-green-500",
    },
  ];

  const floatingIcons = [
    { icon: <Terminal size={24} />, delay: "100" },
    { icon: <Code2 size={24} />, delay: "1000" },
    { icon: <Binary size={24} />, delay: "2000" },
    { icon: <Cpu size={24} />, delay: "3000" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center  pb-20 px-4 overflow-hidden">
      {/* Animated Background Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute ${
            darkMode ? "text-white/20" : "text-gray-800/10"
          }`}
          style={{
            animation: `float 15s infinite linear`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {item.icon}
        </div>
      ))}

      {/* Main Content */}
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Side - Greeting */}
          <div className="lg:w-6/12 space-y-4">
            <div className="space-y-4">
              <h1
                className={`text-4xl md:text-6xl font-bold ${
                  darkMode ? "text-white" : "text-light-text-primary"
                }`}
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
                  {greeting}
                </span>
                <br />
                <span className="inline-flex">
                  I am{" "}
                  <span className="text-purple-500 ml-2 relative">{name}</span>
                </span>
              </h1>
              
            </div>

            <div
              className={`flex flex-wrap gap-4 transform transition-all duration-1000 delay-500 ${
                showRoles
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* Resume Download Button */}
              <a
                href="/resume.pdf"
                download="Md_Sahal_Resume.pdf"
                className={`group relative p-3 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-2 ${
                  darkMode
                    ? "bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50"
                    : "bg-light-surface-primary border border-light-border-primary hover:bg-light-surface-secondary shadow-light-md"
                }`}
                aria-label="Download Resume"
                title="Download Resume"
              >
                <Download className="w-6 h-6 text-purple-500 group-hover:text-purple-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </a>
              
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    link.color
                  } 
                    transform hover:scale-110 hover:rotate-[8deg] ${
                      darkMode
                        ? "bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50"
                        : "bg-light-surface-primary border border-light-border-primary hover:bg-light-surface-secondary shadow-light-md"
                    }`}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side - Dual Panel Development Environment */}
          <div
            className={`lg:w-6/12 transform transition-all duration-1000 ${
              showRoles
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }`}
          >
            <div className="flex flex-col items-center space-y-8">
              {/* Development Environment - Side by Side */}
              <div className="relative group">
                <div className={`absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-2xl blur transition duration-1000 group-hover:duration-200 ${
                  darkMode ? "opacity-75 group-hover:opacity-100" : "opacity-30 group-hover:opacity-50"
                }`}></div>
                <div className="relative flex flex-col md:flex-row gap-4">
                  
                  {/* Terminal Panel */}
                  <div className={`w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 ${
                    darkMode ? "border-gray-700 bg-gray-900 shadow-terminal-dark" : "border-light-border-secondary bg-light-surface-primary shadow-terminal-light"
                  } p-4 md:p-6`}>
                    {/* Terminal Header */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className={`text-sm ml-4 ${darkMode ? "text-gray-400" : "text-light-text-tertiary"}`}>
                        terminal
                      </span>
                    </div>
                    
                    {/* Terminal Content */}
                    <div className="text-xs md:text-sm font-mono h-full flex flex-col">
                      {/* Code Section - Smaller on mobile */}
                      <div className="space-y-1 md:space-y-2 mb-2 md:mb-4">
                        <div className={`${darkMode ? "text-green-400" : "text-green-600"}`}>
                          <span className="text-blue-400">const</span> developer = <span className="text-yellow-400">"Sahal"</span>;
                        </div>
                        <div className={`${darkMode ? "text-green-400" : "text-green-600"}`}>
                          <span className="text-blue-400">let</span> skills = [<span className="text-yellow-400">"Java"</span>, <span className="text-yellow-400">"Spring Boot"</span>];
                        </div>
                        <div className={`${darkMode ? "text-green-400" : "text-green-600"}`}>
                          <span className="text-blue-400">function</span> <span className="text-purple-400">solveProblem</span>() {"{"}
                        </div>
                        <div className={`ml-2 md:ml-4 ${darkMode ? "text-green-400" : "text-green-600"}`}>
                          <span className="text-blue-400">return</span> <span className="text-yellow-400">"Innovation"</span>;
                        </div>
                        <div className={`${darkMode ? "text-green-400" : "text-green-600"}`}>
                          {"}"}
                        </div>
                      </div>
                      
                      {/* Dynamic Role Display - More space */}
                      <div className="pt-2 border-t border-gray-600/30 flex-1 flex flex-col justify-center">
                        <div className={`${darkMode ? "text-gray-400" : "text-light-text-tertiary"}`}>
                          $ <span className="text-blue-400">whoami</span>
                        </div>
                        {showRoles && (
                          <div className="mt-2">
                            <div className={`${darkMode ? "text-green-400" : "text-green-600"}`}>
                              <span className="text-purple-400">role:</span> <span className={`${roles[currentIndex].color} font-semibold`}>
                                {currentText}
                                <span className="animate-blink">_</span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Browser Panel */}
                  <div className={`w-72 h-60 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 ${
                    darkMode ? "border-gray-700 bg-gray-900 shadow-terminal-dark" : "border-light-border-secondary bg-light-surface-primary shadow-terminal-light"
                  }`}>
                    {/* Browser Header */}
                    <div className={`flex items-center space-x-2 px-4 py-3 border-b ${
                      darkMode ? "border-gray-700 bg-gray-800" : "border-light-border-primary bg-light-bg-tertiary"
                    }`}>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className={`flex-1 mx-4 px-3 py-1 rounded text-xs ${
                        darkMode ? "bg-gray-700 text-gray-300" : "bg-light-surface-primary text-light-text-tertiary"
                      }`}>
                        mdsahal.com
                      </div>
                    </div>
                    
                    {/* Browser Content */}
                    <div className="h-full flex items-start justify-start pt-16 px-6">
                      {/* Large Role Display - Two Lines */}
                      {showRoles && (
                        <div className="text-left">
                          <div className={`text-2xl md:text-3xl font-bold ${roles[currentIndex].color} mb-1`}>
                            {currentText.split(' ')[0]}
                          </div>
                          <div className={`text-2xl md:text-3xl font-bold ${roles[currentIndex].color}`}>
                            {currentText.split(' ').slice(1).join(' ')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Floating Code Icon */}
                <div className={`absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center animate-pulse ${
                  darkMode ? "shadow-2xl" : "shadow-terminal-light"
                }`}>
                  <Code2 className="text-white" size={32} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
