import { BookOpen, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Blog = ({ darkMode }) => {
  const blogs = [
    {
      title: "Camera Specification – HDR",
      excerpt: "Understanding High Dynamic Range in modern camera systems",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "https://d-list.net/camera-specification-hdr-or-high-dynamic-range-explained/",
      category: "Photography",
      date: "Recent"
    },
    {
      title: "Smartphone Proximity Sensor",
      excerpt: "Deep dive into how proximity sensors work in modern smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      link: "https://d-list.net/smartphone-specification-proximity-sensor/",
      category: "Technology",
      date: "Recent"
    },
    {
      title: "Competitive Programming Guide",
      excerpt: "A comprehensive guide to getting started with competitive programming",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
      link: "https://d-list.net/competitive-programming-what-and-why/",
      category: "Programming",
      date: "Recent"
    },
    {
      title: "5 Small Free Software That Can Make Your Life Easier",
      excerpt: "Discover 5 lightweight free software tools including Everything, Unlocker, QTTabBar, WinDirStat, and Key Remapper that can significantly improve your productivity.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "https://d-list.net/5-small-free-softwares-that-can-make-your-life-easier/",
      category: "Software",
      date: "December 21, 2020"
    },
    {
      title: "Codeforces Round 529(Div. 3) D. Circular Dance – Solution",
      excerpt: "A detailed solution to the Circular Dance problem using graph theory and DFS algorithm with C++ implementation.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      link: "https://d-list.net/codeforces-round-529div-3-d-circular-dance-solution/",
      category: "Programming",
      date: "December 15, 2020"
    },
    {
      title: "Camera Specification : Megapixel Explained",
      excerpt: "Understanding what megapixels mean in digital photography and how they affect image quality, storage, and camera performance.",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "https://d-list.net/camera-specification-megapixel-explained/",
      category: "Photography",
      date: "December 10, 2020"
    },
    {
      title: "Things You Should Take Care Before Buying a Smartwatch",
      excerpt: "Essential factors to consider before purchasing a smartwatch including OS compatibility, display type, touch interface, pricing, fitness tracking, and battery life.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      link: "https://d-list.net/things-you-should-take-care-before-buying-a-smartwatch/",
      category: "Technology",
      date: "December 8, 2020"
    },
    {
      title: "Smartphone Processors",
      excerpt: "Comprehensive guide to smartphone processors covering cores, clock speed, and how they impact performance and battery life.",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      link: "https://d-list.net/smartphone-processors/",
      category: "Technology",
      date: "December 7, 2020"
    },
    {
      title: "5 Amazing Gadgets Invented in 2020",
      excerpt: "Explore revolutionary gadgets from 2020 including GIBBS BISKI amphibious motorcycle, Focals smart glasses, Morus Zero dryer, Armor 9 thermal imaging phone, and StopSleep driver alarm.",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      link: "https://d-list.net/5-amazing-gadgets-invented-in-2020/",
      category: "Gadgets",
      date: "January 12, 2021"
    },
    {
      title: "Best Bangla Typing App For Android Mobile – Bangla Keyboard",
      excerpt: "Top mobile keyboard applications for Android users including Ridmik Keyboard, Gboard, Mayabi keyboard, and Bijoy Android Keyboard for smooth Bangla typing.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      link: "https://d-list.net/best-bangla-typing-keyboard-app-for-android-mobile/",
      category: "Mobile Apps",
      date: "January 6, 2021"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const blogsPerPage = 3;
  const totalSlides = Math.ceil(blogs.length / blogsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentBlogs = () => {
    const startIndex = currentSlide * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    return blogs.slice(startIndex, endIndex);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Blog
        </h1>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "bg-gray-800/80 hover:bg-gray-700/80 text-white"
                : "bg-white/80 hover:bg-white text-gray-800"
            } shadow-lg hover:shadow-xl`}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "bg-gray-800/80 hover:bg-gray-700/80 text-white"
                : "bg-white/80 hover:bg-white text-gray-800"
            } shadow-lg hover:shadow-xl`}
          >
            <ChevronRight size={24} />
          </button>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-12">
            {getCurrentBlogs().map((blog, index) => (
              <article
                key={index}
                className={`group rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border flex flex-col h-[500px] ${
                  darkMode
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/80 border-gray-200/50"
                }`}
              >
                <div className="relative h-48 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 z-20 px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full text-sm text-white">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start gap-2 mb-3">
                    <BookOpen className="text-purple-400 flex-shrink-0 mt-1" size={20} />
                    <h3
                      className={`text-lg font-semibold leading-tight ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {blog.title}
                    </h3>
                  </div>

                  {blog.date && (
                    <p
                      className={`text-sm mb-3 ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {blog.date}
                    </p>
                  )}

                  <p
                    className={`mb-4 flex-grow text-sm leading-relaxed ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {blog.excerpt}
                  </p>

                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-pink-400 transition-colors mt-auto"
                  >
                    Read More
                    <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-purple-500"
                    : darkMode
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
