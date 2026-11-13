import { useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";

const BLOGS = [
  {
    title: "Camera Specification – HDR",
    excerpt: "Understanding High Dynamic Range in modern camera systems",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80",
    link: "https://d-list.net/camera-specification-hdr-or-high-dynamic-range-explained/",
    category: "Photography",
    date: "Featured Essay",
  },
  {
    title: "Smartphone Proximity Sensor",
    excerpt: "Deep dive into how proximity sensors work in modern smartphones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    link: "https://d-list.net/smartphone-specification-proximity-sensor/",
    category: "Technology",
    date: "Hardware Deep Dive",
  },
  {
    title: "Competitive Programming Guide",
    excerpt:
      "A comprehensive guide to getting started with competitive programming",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    link: "https://d-list.net/competitive-programming-what-and-why/",
    category: "Programming",
    date: "Algorithmic Guide",
  },
  {
    title: "5 Small Free Software That Can Make Your Life Easier",
    excerpt:
      "Discover 5 lightweight free software tools including Everything, Unlocker, QTTabBar, WinDirStat, and Key Remapper that can significantly improve your productivity.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80",
    link: "https://d-list.net/5-small-free-softwares-that-can-make-your-life-easier/",
    category: "Software",
    date: "December 21, 2020",
  },
  {
    title: "Codeforces Round 529(Div. 3) D. Circular Dance – Solution",
    excerpt:
      "A detailed solution to the Circular Dance problem using graph theory and DFS algorithm with C++ implementation.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    link: "https://d-list.net/codeforces-round-529div-3-d-circular-dance-solution/",
    category: "Programming",
    date: "December 15, 2020",
  },
  {
    title: "Camera Specification : Megapixel Explained",
    excerpt:
      "Understanding what megapixels mean in digital photography and how they affect image quality, storage, and camera performance.",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80",
    link: "https://d-list.net/camera-specification-megapixel-explained/",
    category: "Photography",
    date: "December 10, 2020",
  },
  {
    title: "Things You Should Take Care Before Buying a Smartwatch",
    excerpt:
      "Essential factors to consider before purchasing a smartwatch including OS compatibility, display type, touch interface, pricing, fitness tracking, and battery life.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    link: "https://d-list.net/things-you-should-take-care-before-buying-a-smartwatch/",
    category: "Technology",
    date: "December 8, 2020",
  },
  {
    title: "Smartphone Processors",
    excerpt:
      "Comprehensive guide to smartphone processors covering cores, clock speed, and how they impact performance and battery life.",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
    link: "https://d-list.net/smartphone-processors/",
    category: "Technology",
    date: "December 7, 2020",
  },
  {
    title: "5 Amazing Gadgets Invented in 2020",
    excerpt:
      "Explore revolutionary gadgets from 2020 including GIBBS BISKI amphibious motorcycle, Focals smart glasses, Morus Zero dryer, Armor 9 thermal imaging phone, and StopSleep driver alarm.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=80",
    link: "https://d-list.net/5-amazing-gadgets-invented-in-2020/",
    category: "Gadgets",
    date: "January 12, 2021",
  },
  {
    title: "Best Bangla Typing App For Android Mobile – Bangla Keyboard",
    excerpt:
      "Top mobile keyboard applications for Android users including Ridmik Keyboard, Gboard, Mayabi keyboard, and Bijoy Android Keyboard for smooth Bangla typing.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    link: "https://d-list.net/best-bangla-typing-keyboard-app-for-android-mobile/",
    category: "Mobile Apps",
    date: "January 6, 2021",
  },
];

const Blog = ({ darkMode }) => {
  const [activeArticle, setActiveArticle] = useState(BLOGS[0]);

  return (
    <section
      className={`py-28 px-4 sm:px-6 lg:px-10 border-b transition-colors ${
        darkMode
          ? "bg-[#050508] border-white/[0.08]"
          : "bg-[#f3efe8] border-black/[0.08]"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="font-tech-mono text-xs uppercase tracking-[0.22em] text-[#e7dec8] opacity-80">
              CHAPTER 07 // TECHNICAL WRITING &amp; ESSAYS (10)
            </div>
            <h2 className="font-architectural text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.04]">
              Written{" "}
              <span className="font-editorial-serif italic font-normal champagne-accent-text">
                Archive.
              </span>
            </h2>
          </div>
          <p className="font-tech-mono text-xs opacity-60 max-w-sm">
            Published articles on competitive programming, graph algorithms,
            mobile silicon, and optical hardware.
          </p>
        </div>

        {/* Editorial Split: Sticky Article Preview (5 Cols) + Typographic Essay Index (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Editorial Preview Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden border border-current/15 bg-zinc-900">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-tech-mono text-[11px]">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                  {activeArticle.category}
                </span>
                <span className="opacity-80">{activeArticle.date}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-tech-mono text-xs opacity-60">
                <BookOpen size={14} />
                <span>SELECTED ESSAY SYNOPSIS</span>
              </div>
              <h3 className="font-architectural text-2xl font-bold leading-snug">
                {activeArticle.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  darkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {activeArticle.excerpt}
              </p>
              <div className="pt-2">
                <a
                  href={activeArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-tech-mono text-xs font-semibold text-[#e7dec8] underline underline-offset-4"
                >
                  <span>Read Full Article on d-list.net</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Editorial Index List */}
          <div className="lg:col-span-7 divide-y divide-current/15 border-t border-b border-current/15">
            {BLOGS.map((blog, idx) => {
              const isSelected = activeArticle.title === blog.title;
              return (
                <a
                  key={blog.title}
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveArticle(blog)}
                  className={`py-5 px-3 transition-all duration-200 flex items-center justify-between gap-4 group ${
                    isSelected
                      ? darkMode
                        ? "bg-white/[0.05]"
                        : "bg-black/[0.05]"
                      : "opacity-75 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="font-tech-mono text-xs opacity-40 shrink-0">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-architectural font-semibold text-base sm:text-lg group-hover:underline truncate">
                        {blog.title}
                      </h4>
                      <p className="text-xs opacity-60 truncate mt-0.5">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline font-tech-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-current/15 opacity-70">
                      {blog.category}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
