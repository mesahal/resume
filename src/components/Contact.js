import { useState } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Facebook,
  Youtube,
  Loader2,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import XLogoB from "../assets/optimized/twitterx--v2.png";
import XLogo from "../assets/xlogo.svg";
import { FaWhatsapp } from "react-icons/fa";

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("mdsahal.info@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      await emailjs.send(
        "service_df5p3hu",
        "template_55ulj5l",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Sahal",
          subject: `New Contact Form Message from ${formData.name}`,
          reply_to: formData.email,
        },
        "rjUvfBFXMK6NTFfAJ"
      );

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: "Failed to send message. Please try again.",
      });
    }
  };

  const socials = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      link: "https://www.linkedin.com/in/me-sahal/",
    },
    {
      name: "GitHub",
      icon: <Github size={18} />,
      link: "https://github.com/mesahal",
    },
    {
      name: "Email",
      icon: <Mail size={18} />,
      link: "mailto:mdsahal.info@gmail.com",
    },
    {
      name: "YouTube",
      icon: <Youtube size={18} />,
      link: "https://www.youtube.com/@me__sahal",
    },
    {
      name: "Twitter",
      icon: (
        <img
          src={darkMode ? XLogoB : XLogo}
          alt="X"
          className="w-4 h-4 object-contain"
        />
      ),
      link: "https://twitter.com/me__sahal",
    },
    {
      name: "Facebook",
      icon: <Facebook size={18} />,
      link: "https://www.facebook.com/memdsahal",
    },
    {
      name: "Instagram",
      icon: <Instagram size={18} />,
      link: "https://www.instagram.com/me_md_sahal",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={18} />,
      link: "https://whatsapp.com/channel/0029VapIAQjKgsO1w66ao52d",
    },
  ];

  return (
    <footer
      className={`pt-28 pb-16 px-4 sm:px-6 lg:px-10 transition-colors ${
        darkMode ? "bg-[#030305]" : "bg-[#eae5dc]"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Main Split: Monumental Closing Statement (6 Cols) + Minimalist Architectural Form (6 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="font-tech-mono text-xs uppercase tracking-[0.22em] text-[#e7dec8] opacity-80">
                CHAPTER 08 // INITIATE DIALOGUE
              </div>
              <h2 className="font-architectural text-4xl sm:text-6xl font-bold tracking-[-0.035em] leading-[1.02]">
                Have a complex{" "}
                <span className="font-editorial-serif italic font-normal champagne-accent-text">
                  problem
                </span>{" "}
                worth solving?
              </h2>
              <p
                className={`text-base leading-relaxed max-w-md ${
                  darkMode ? "text-zinc-400" : "text-zinc-700"
                }`}
              >
                Whether you are scaling enterprise Spring Boot microservices,
                integrating OpenAI pipelines, or looking for an engineer with
                deep algorithmic foundations — let’s connect.
              </p>
            </div>

            {/* Direct Email Copy Trigger */}
            <div className="space-y-2">
              <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50">
                DIRECT ELECTRONIC MAIL
              </div>
              <button
                onClick={handleCopyEmail}
                className="group inline-flex items-center gap-3 text-lg sm:text-2xl font-tech-mono border-b border-current/30 pb-1.5 hover:border-[#e7dec8] transition"
              >
                <span>mdsahal.info@gmail.com</span>
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                    <Check size={15} /> Copied
                  </span>
                ) : (
                  <Copy
                    size={16}
                    className="opacity-50 group-hover:opacity-100 transition"
                  />
                )}
              </button>
            </div>

            {/* Social Directory */}
            <div className="space-y-3 pt-2">
              <div className="font-tech-mono text-[10px] uppercase tracking-widest opacity-50">
                VERIFIED CHANNELS
              </div>
              <div className="flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`px-3.5 py-2 rounded-full border text-xs font-tech-mono flex items-center gap-2 transition hover:scale-105 ${
                      darkMode
                        ? "border-white/15 bg-white/[0.02] hover:border-[#e7dec8]/60 text-zinc-200"
                        : "border-black/15 bg-black/[0.02] hover:border-black text-zinc-800"
                    }`}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Architectural Form (Underline Inputs, No Boxy Container) */}
          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="font-tech-mono text-xs uppercase tracking-widest opacity-60">
                SEND A DIRECT TRANSMISSION
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-tech-mono text-[10px] uppercase tracking-widest opacity-60">
                    01 / YOUR NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Md Sahal"
                    required
                    className="w-full bg-transparent border-b border-current/25 py-3 text-base focus:outline-none focus:border-[#e7dec8] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-tech-mono text-[10px] uppercase tracking-widest opacity-60">
                    02 / YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className="w-full bg-transparent border-b border-current/25 py-3 text-base focus:outline-none focus:border-[#e7dec8] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-tech-mono text-[10px] uppercase tracking-widest opacity-60">
                  03 / PROJECT OR OPPORTUNITY BRIEF
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the system, architecture, or role..."
                  required
                  rows="4"
                  className="w-full bg-transparent border-b border-current/25 py-3 text-base focus:outline-none focus:border-[#e7dec8] transition-colors resize-none"
                />
              </div>

              {status.error && (
                <p className="text-rose-400 text-xs font-tech-mono">
                  {status.error}
                </p>
              )}

              {status.success && (
                <p className="text-emerald-400 text-xs font-tech-mono">
                  ✓ Transmission received. I will respond shortly.
                </p>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className={`px-8 py-4 rounded-full font-tech-mono text-xs uppercase tracking-widest font-semibold transition flex items-center gap-2.5 disabled:opacity-60 ${
                  darkMode
                    ? "bg-[#e7dec8] text-black hover:bg-white"
                    : "bg-[#141413] text-white hover:bg-zinc-800"
                }`}
              >
                {status.loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowUpRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Architectural Colophon */}
        <div className="pt-10 border-t border-current/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-tech-mono text-xs opacity-60">
          <div>
            © {new Date().getFullYear()} MD SAHAL · SOFTWARE ENGINEER I @ BRAIN
            STATION 23 PLC.
          </div>
          <div>ENGINEERED IN DHAKA · IIT, JAHANGIRNAGAR UNIVERSITY</div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
