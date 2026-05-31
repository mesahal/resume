const SectionHeading = ({ title, subtitle, darkMode }) => (
  <div className="text-center mb-12">
    <h1 className={`text-4xl font-bold tracking-tight mb-4 ${
      darkMode ? "text-white" : "text-gray-900"
    }`}>
      {title}
    </h1>
    <div className="flex items-center justify-center gap-1.5 mb-4">
      <div className="w-2 h-2 rounded-full bg-purple-500" />
      <div className="w-8 h-1 rounded-full bg-gradient-to-r from-purple-500 to-violet-500" />
      <div className="w-2 h-2 rounded-full bg-violet-500" />
    </div>
    {subtitle && (
      <p className={`text-base max-w-xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
