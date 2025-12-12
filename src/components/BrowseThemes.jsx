import data from "../data/data.json";

export default function BrowseThemes({ onThemeClick }) {
  const handleCardClick = (themeCard) => {
    // Scroll to main archive with offset
    const archiveSection = document.getElementById("main-archive");
    if (archiveSection) {
      const offset = 80;
      const elementPosition = archiveSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    onThemeClick?.(themeCard);
  };

  const getObjectCount = (objectIds) => {
    return objectIds.length;
  };

  return (
    <section
      id="browse-themes"
      className="bg-(--cloud-white) py-12 md:py-16 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-(--black-ink) mb-4">
            Browse by Theme
          </h2>
          <p className="text-(--soft-soil) text-lg max-w-2xl mx-auto font-sans">
            Explore objects grouped by narrative categories
          </p>
        </div>

        {/* Theme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {data.themeCards.map((themeCard) => {
            const objectCount = getObjectCount(themeCard.objectIds);

            return (
              <button
                key={themeCard.id}
                onClick={() => handleCardClick(themeCard)}
                className="group bg-(--driftwood-tan) rounded-lg p-8 hover:bg-(--wax-amber)/20 
                         transition-all duration-300 text-left border-2 border-transparent 
                         hover:border-(--moss-green) shadow-md hover:shadow-xl"
              >
                <h3
                  className="font-serif text-2xl md:text-3xl font-semibold text-(--black-ink) 
                             mb-4 group-hover:text-(--moss-green) transition-colors"
                >
                  {themeCard.name}
                </h3>

                <p className="text-(--soft-soil) font-sans text-base mb-6 leading-relaxed">
                  {themeCard.description}
                </p>

                {/* Object count badge */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-(--fungal-gray)">
                  <span className="text-sm text-(--soft-soil) font-sans uppercase tracking-wide">
                    {objectCount} {objectCount === 1 ? "object" : "objects"}
                  </span>
                  <span className="text-(--moss-green) group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
