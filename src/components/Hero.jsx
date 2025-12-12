import data from "../data/data.json";
import bgVideo from "../assets/bg-video.mp4";

export default function Hero({ onEnterArchive, onBrowseThemes }) {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-(--tidewater-blue) px-6 py-20 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Strong Overlay for excellent text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/70"></div>

      {/* Subtle gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/20"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white drop-shadow-2xl">
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-semibold mb-6 tracking-tight drop-shadow-lg">
          {data.hero.title}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md">
          {data.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {data.hero.buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => {
                if (button.action === "scrollToArchive") {
                  scrollToSection("main-archive");
                  onEnterArchive?.();
                } else if (button.action === "scrollToThemes") {
                  scrollToSection("browse-themes");
                  onBrowseThemes?.();
                }
              }}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full 
                       text-white font-sans text-lg font-medium hover:bg-white/30 hover:border-white/50 
                       transition-all duration-300 uppercase tracking-wide"
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
