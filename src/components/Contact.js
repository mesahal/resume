import { useState } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  MessageSquare,
  Facebook,
  Youtube,
  Loader2,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      icon: <Linkedin size={24} />,
      link: "https://www.linkedin.com/in/me-sahal/",
      color: "hover:text-blue-500",
    },
    {
      name: "GitHub",
      icon: <Github size={24} />,
      link: "https://github.com/mesahal",
      color: "hover:text-gray-400",
    },
    {
      name: "Email",
      icon: <Mail size={24} />,
      link: "mailto:me.sahal2000@gmail.com",
      color: "hover:text-red-400",
    },
    {
      name: "Facebook",
      icon: <Facebook size={24} />,
      link: "https://www.facebook.com/memdsahal",
      color: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      icon: <Instagram size={24} />,
      link: "https://www.instagram.com/me_md_sahal",
      color: "hover:text-pink-500",
    },
    {
      name: "Twitter",
      icon: (
        <img
          src={darkMode ? XLogoB : XLogo}
          alt="X"
          className={`${darkMode ? "w-6 h-6" : "w-5 h-5"} object-contain`}
        />
      ),
      link: "https://twitter.com/me__sahal",
      color: "hover:text-sky-400",
    },
    {
      name: "YouTube",
      icon: <Youtube size={24} />,
      link: "https://www.youtube.com/@me__sahal",
      color: "hover:text-red-500",
    },
    {
      icon: <FaWhatsapp size={24} />,
      href: "https://whatsapp.com/channel/0029VapIAQjKgsO1w66ao52d",
      label: "WhatsApp",
      color: "hover:text-green-500",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <div className="relative inline-block">
            <h1 className={`text-4xl font-bold ${
              darkMode 
                ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent drop-shadow-sm"
            }`}>
              Get in Touch
            </h1>
            {!darkMode && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent opacity-20 blur-sm -z-10">
                Get in Touch
              </div>
            )}
          </div>
          <p className={darkMode ? "text-gray-400" : "text-light-text-secondary"}>
            Let's connect and create something amazing together
          </p>
        </div>

        <div
          className={`rounded-xl p-8 mb-12 border ${
            darkMode
              ? "bg-gray-800/50 border-gray-700/50 shadow-lg"
              : "bg-white/95 border-light-border-secondary shadow-card-light"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className={`${
              darkMode ? "text-purple-400" : "text-purple-600"
            }`} size={24} />
            <h2
              className={`text-2xl font-semibold ${
                darkMode ? "text-gray-200" : "text-light-text-primary"
              }`}
            >
              Send a Message
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-purple-400 outline-none transition-colors ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 text-gray-200"
                    : "bg-white border-light-border-secondary text-light-text-primary placeholder-light-text-muted"
                }`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-purple-400 outline-none transition-colors ${
                  darkMode
                    ? "bg-gray-700/50 border-gray-600 text-gray-200"
                    : "bg-white border-light-border-secondary text-light-text-primary placeholder-light-text-muted"
                }`}
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="4"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-1 focus:ring-purple-400 outline-none transition-colors ${
                darkMode
                  ? "bg-gray-700/50 border-gray-600 text-gray-200"
                  : "bg-white border-light-border-secondary text-light-text-primary placeholder-light-text-muted"
              }`}
            ></textarea>

            {status.error && (
              <p className="text-red-500 text-sm">{status.error}</p>
            )}

            {status.success && (
              <p className="text-green-500 text-sm">
                Message sent successfully!
              </p>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className={`w-full md:w-auto px-8 py-3 bg-gradient-to-r ${
                darkMode 
                  ? "from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600" 
                  : "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              } rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {status.loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full border transition-all duration-300 transform hover:scale-110 ${
                social.color
              } ${
                darkMode
                  ? "bg-gray-800/50 border-gray-700/50"
                  : "bg-white/90 border-light-border-primary shadow-card-light"
              }`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
