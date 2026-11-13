import { useState, useMemo } from "react";
import { Youtube, Play, ExternalLink, Film } from "lucide-react";

const VIDEOS = [
  {
    title:
      "ICPC World Finals 2024: Bangladesh Teams Shine on Global Programming Stage",
    description:
      "Coverage of DU, SUST, and KUET teams representing Bangladesh at the ICPC World Finals 2024.",
    videoId: "zUlaDztnFwY",
    category: "Competitive Programming",
    group: "tech",
  },
  {
    title: "First Bangladeshi Gold Medalist | Debojoti Das Soumya | IOI 2024",
    description:
      "Celebrating the historic achievement of Bangladesh's first IOI Gold Medal.",
    videoId: "OhB2toRifMg",
    category: "Achievement",
    group: "tech",
  },
  {
    title: "First-Ever Private Spacewalk (2024)",
    description:
      "Historic milestone in commercial space exploration with the first private spacewalk.",
    videoId: "7lbgZPalIaE",
    category: "Space",
    group: "science",
  },
  {
    title: "কে নির্বাচন করে আমেরিকার প্রেসিডেন্ট?",
    description:
      "An in-depth explanation of the US Presidential election process.",
    videoId: "9gSDZkE9Iho",
    category: "Educational",
    group: "science",
  },
  {
    title: "কীভাবে ইংরেজি ক্যালেন্ডার ছড়িয়ে পড়লো সারা বিশ্বে!",
    description:
      "The fascinating history of how the English calendar spread worldwide.",
    videoId: "_JF1LZ_eHvc",
    category: "History",
    group: "history",
  },
  {
    title: "পানির ইলিশ সোনার দরে । ইলিশের দাম বৃদ্ধি",
    description:
      "Analysis of the rising prices of Hilsa fish and its economic impact.",
    videoId: "KJQk_8yJvtM",
    category: "Economics",
    group: "science",
  },
  {
    title: "ইহুদীদের প্রকৃত ইতিহাস কী? - পর্ব 1",
    description:
      "ইহুদীদের প্রকৃত ইতিহাস নিয়ে একটি বিস্তারিত আলোচনা - প্রথম পর্ব",
    videoId: "YwZDelnHO8w",
    category: "ইতিহাস",
    group: "history",
  },
  {
    title: "ইহুদীদের প্রকৃত ইতিহাস - পর্ব 2 | হযরত ইউসুফ আঃ এর অলৌকিক ঘটনা",
    description:
      "হযরত ইউসুফ (আঃ) এর অলৌকিক ঘটনা সহ ইহুদীদের ইতিহাসের দ্বিতীয় পর্ব",
    videoId: "rZK5tj86S7o",
    category: "ইতিহাস",
    group: "history",
  },
  {
    title: "আল আকসার ইতিহাস | ইহুদী ইতিহাস পর্ব ৩",
    description: "আল আকসা মসজিদের ইতিহাস এবং ইহুদীদের ইতিহাসের তৃতীয় পর্ব",
    videoId: "LLbICWaSi2s",
    category: "ইতিহাস",
    group: "history",
  },
  {
    title: "ইহুদীদের নির্যাতন করেছিল কারা ? ইহুদীদের প্রকৃত ইতিহাস কী? পর্ব - ৪",
    description:
      "ইহুদীদের নির্যাতনের ইতিহাস এবং তাদের প্রকৃত ইতিহাস নিয়ে চতুর্থ পর্ব",
    videoId: "Jt0MTSVo1tw",
    category: "ইতিহাস",
    group: "history",
  },
];

const Videos = ({ darkMode }) => {
  const [selectedVideo, setSelectedVideo] = useState(VIDEOS[0]);
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [activeGroup, setActiveGroup] = useState("all");

  const filteredVideos = useMemo(() => {
    if (activeGroup === "all") return VIDEOS;
    return VIDEOS.filter((v) => v.group === activeGroup);
  }, [activeGroup]);

  const handleSelectEpisode = (video) => {
    setSelectedVideo(video);
    setIsPlayingInline(false);
  };

  return (
    <section
      className={`py-28 px-4 sm:px-6 lg:px-10 border-b transition-colors ${
        darkMode
          ? "bg-[#08070b] border-white/[0.08]"
          : "bg-[#f8f5ef] border-black/[0.08]"
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Chapter Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-current/15">
          <div className="space-y-3">
            <div className="font-tech-mono text-xs uppercase tracking-[0.22em] text-rose-400">
              CHAPTER 06 // THE SCREENING ROOM (@ME__SAHAL)
            </div>
            <h2 className="font-architectural text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.04]">
              Documentary{" "}
              <span className="font-editorial-serif italic font-normal champagne-accent-text">
                Storytelling.
              </span>
            </h2>
          </div>

          {/* Topic Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "All Episodes (10)" },
              { id: "tech", label: "ICPC & IOI Milestones" },
              { id: "science", label: "Space, Science & Economics" },
              { id: "history", label: "Historical Series" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveGroup(tab.id);
                  const list =
                    tab.id === "all"
                      ? VIDEOS
                      : VIDEOS.filter((v) => v.group === tab.id);
                  if (list.length > 0) handleSelectEpisode(list[0]);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${
                  activeGroup === tab.id
                    ? "bg-rose-500 text-white border-rose-500"
                    : darkMode
                    ? "border-white/15 text-zinc-400 hover:text-white"
                    : "border-black/15 text-zinc-700 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cinema Screening Stage (7 Cols) + Episode Index (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Widescreen Cinema Stage */}
          <div className="lg:col-span-7 space-y-5">
            <div className="relative rounded-[28px] overflow-hidden bg-black aspect-video border border-white/15 shadow-2xl">
              {isPlayingInline ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${selectedVideo.videoId}/maxresdefault.jpg`}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Center Play Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlayingInline(true)}
                      className="group px-6 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-tech-mono text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-2xl transition transform hover:scale-105"
                    >
                      <Play size={16} fill="currentColor" />
                      <span>Play Episode in Screening Room</span>
                    </button>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 font-tech-mono text-[11px] text-rose-300">
                      {selectedVideo.category}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-2">
              <div className="space-y-2">
                <h3 className="font-architectural text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                  {selectedVideo.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    darkMode ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {selectedVideo.description}
                </p>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-current/20 font-tech-mono text-xs shrink-0 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition"
              >
                <Youtube size={15} />
                <span>Watch on YouTube</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Right Playlist Reel (5 Cols) */}
          <div className="lg:col-span-5 space-y-2 max-h-[520px] overflow-y-auto pr-1 divide-y divide-current/10 border-t border-b border-current/15">
            {filteredVideos.map((video, idx) => {
              const isCurrent = selectedVideo.videoId === video.videoId;
              return (
                <button
                  key={video.videoId}
                  onClick={() => handleSelectEpisode(video)}
                  className={`w-full text-left py-3.5 px-3 transition flex items-center gap-3.5 group ${
                    isCurrent
                      ? darkMode
                        ? "bg-white/[0.07]"
                        : "bg-black/[0.06]"
                      : "hover:opacity-100 opacity-75"
                  }`}
                >
                  <div className="relative w-24 aspect-video rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-white/10">
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    {isCurrent && (
                      <div className="absolute inset-0 bg-rose-600/60 flex items-center justify-center text-white">
                        <Film size={14} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-tech-mono text-[10px] text-rose-400 uppercase tracking-wider">
                      EP 0{idx + 1} · {video.category}
                    </div>
                    <div className="font-semibold text-xs sm:text-sm line-clamp-2 mt-0.5 leading-snug">
                      {video.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;
