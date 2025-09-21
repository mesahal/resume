import { Youtube, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Videos = ({ darkMode }) => {
  const videos = [
    {
      title:
        "ICPC World Finals 2024: Bangladesh Teams Shine on Global Programming Stage",
      description:
        "Coverage of DU, SUST, and KUET teams representing Bangladesh at the ICPC World Finals 2024",
      videoId: "zUlaDztnFwY",
      category: "Competitive Programming",
    },
    {
      title: "First Bangladeshi Gold Medalist | Debojoti Das Soumya | IOI 2024",
      description:
        "Celebrating the historic achievement of Bangladesh's first IOI Gold Medal",
      videoId: "OhB2toRifMg",
      category: "Achievement",
    },
    {
      title: "কে নির্বাচন করে আমেরিকার প্রেসিডেন্ট?",
      description:
        "An in-depth explanation of the US Presidential election process",
      videoId: "9gSDZkE9Iho",
      category: "Educational",
    },
    {
      title: "First-Ever Private Spacewalk (2024)",
      description:
        "Historic milestone in commercial space exploration with the first private spacewalk",
      videoId: "7lbgZPalIaE",
      category: "Space",
    },
    {
      title: "কীভাবে ইংরেজি ক্যালেন্ডার ছড়িয়ে পড়লো সারা বিশ্বে!",
      description:
        "The fascinating history of how the English calendar spread worldwide",
      videoId: "_JF1LZ_eHvc",
      category: "History",
    },
    {
      title: "পানির ইলিশ সোনার দরে । ইলিশের দাম বৃদ্ধি",
      description:
        "Analysis of the rising prices of Hilsa fish and its economic impact",
      videoId: "KJQk_8yJvtM",
      category: "Economics",
    },
    {
      title: "ইহুদীদের প্রকৃত ইতিহাস কী? - পর্ব 1",
      description:
        "ইহুদীদের প্রকৃত ইতিহাস নিয়ে একটি বিস্তারিত আলোচনা - প্রথম পর্ব",
      videoId: "YwZDelnHO8w",
      category: "ইতিহাস",
    },
    {
      title: "ইহুদীদের প্রকৃত ইতিহাস - পর্ব 2 | হযরত ইউসুফ আঃ এর অলৌকিক ঘটনা",
      description:
        "হযরত ইউসুফ (আঃ) এর অলৌকিক ঘটনা সহ ইহুদীদের ইতিহাসের দ্বিতীয় পর্ব",
      videoId: "rZK5tj86S7o",
      category: "ইতিহাস",
    },
    {
      title: "আল আকসার ইতিহাস | ইহুদী ইতিহাস পর্ব ৩",
      description:
        "আল আকসা মসজিদের ইতিহাস এবং ইহুদীদের ইতিহাসের তৃতীয় পর্ব",
      videoId: "LLbICWaSi2s",
      category: "ইতিহাস",
    },
    {
      title: "ইহুদীদের নির্যাতন করেছিল কারা ? ইহুদীদের প্রকৃত ইতিহাস কী? পর্ব - ৪",
      description:
        "ইহুদীদের নির্যাতনের ইতিহাস এবং তাদের প্রকৃত ইতিহাস নিয়ে চতুর্থ পর্ব",
      videoId: "Jt0MTSVo1tw",
      category: "ইতিহাস",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className={`text-4xl font-bold ${
              darkMode 
                ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent drop-shadow-sm"
            }`}>
              Content Creation
            </h1>
            {!darkMode && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent opacity-20 blur-sm -z-10">
                Content Creation
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <Swiper
            slidesPerView={3}
            spaceBetween={24}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              prevEl: ".videos-swiper-button-prev",
              nextEl: ".videos-swiper-button-next",
            }}
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="pb-12"
          >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div
                  className={`group rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 h-[550px] border flex flex-col cursor-pointer ${
                    darkMode
                      ? "bg-gray-800/50 border-gray-700/50 shadow-lg"
                      : "bg-white/95 border-light-border-secondary shadow-card-light hover:shadow-card-hover"
                  }`}
                >
                  <div className="relative aspect-video flex-shrink-0 group">
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-20 h-14 bg-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start gap-2 mb-4">
                      <Youtube className={`flex-shrink-0 mt-1 ${
                        darkMode ? "text-purple-400" : "text-purple-600"
                      }`} size={20} />
                      <h3
                        className={`text-xl font-semibold line-clamp-2 ${
                          darkMode ? "text-gray-200" : "text-light-text-primary"
                        }`}
                      >
                        {video.title}
                      </h3>
                    </div>

                    <p
                      className={`mb-6 line-clamp-4 flex-grow ${
                        darkMode ? "text-gray-400" : "text-light-text-secondary"
                      }`}
                    >
                      {video.description}
                    </p>

                    <div className={`inline-flex items-center gap-2 transition-colors mt-auto ${
                      darkMode 
                        ? "text-purple-400 hover:text-pink-400" 
                        : "text-purple-600 hover:text-purple-700"
                    }`}>
                      Watch Video
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "bg-gray-800/80 hover:bg-gray-700/80 text-white"
                : "bg-white/80 hover:bg-white text-light-text-primary"
            } shadow-card-light hover:shadow-card-hover videos-swiper-button-prev`}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 ${
              darkMode
                ? "bg-gray-800/80 hover:bg-gray-700/80 text-white"
                : "bg-white/80 hover:bg-white text-light-text-primary"
            } shadow-card-light hover:shadow-card-hover videos-swiper-button-next`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Videos;
