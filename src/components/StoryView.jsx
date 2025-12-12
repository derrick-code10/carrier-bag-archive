import { useEffect, useRef } from "react";
import { getObjectImage } from "../utils/images";
import data from "../data/data.json";
import audio2 from "../assets/audio2.mp3";

export default function StoryView({ object, objects, onClose, onObjectClick }) {
  const storyAudioRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const audioElement = storyAudioRef.current;
    if (audioElement) {
      audioElement.play().catch((error) => {
        console.log("Audio autoplay prevented:", error);
      });
    }

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, [object]);

  if (!object) return null;

  const getSimilarObjects = () => {
    const themeCard = data.themeCards.find((theme) =>
      theme.objectIds.includes(object.id)
    );
    if (!themeCard) return [];
    return objects.filter(
      (obj) => themeCard.objectIds.includes(obj.id) && obj.id !== object.id
    );
  };

  const similarObjects = getSimilarObjects();

  const getCluster = () => {
    return data.archiveIndex.clusters.find((cluster) =>
      cluster.objectIds.includes(object.id)
    );
  };

  const cluster = getCluster();

  return (
    <section className="min-h-screen bg-(--cloud-white)">
      {/* Story audio */}
      <audio ref={storyAudioRef} src={audio2} loop />
      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-(--cloud-white)/95 backdrop-blur-sm border-b border-(--fungal-gray)">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-(--soft-soil) hover:text-(--moss-green) 
                     transition-colors font-sans group"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span className="font-medium">Back to Archive</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Main Content - Side by side layout */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 mb-16">
          <div className="w-full lg:w-1/2 sticky top-24">
            <img
              src={getObjectImage(object.id)}
              alt={object.name}
              className="w-full h-auto object-contain rounded-lg shadow-xl"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col">
            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 text-(--black-ink)">
              {object.name}
            </h1>

            {/* Tagline */}
            <p className="text-(--soft-soil) text-xl md:text-2xl mb-8 italic font-sans">
              {object.shortTagline}
            </p>

            {/* Story */}
            <div className="mb-10 grow">
              <p className="font-sans text-(--black-ink) text-lg md:text-xl leading-relaxed whitespace-pre-line">
                {object.story}
              </p>
            </div>

            {/* Metadata */}
            <div className="border-t border-(--fungal-gray) pt-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-(--soft-soil) font-medium text-sm block mb-2">
                    Collected by:
                  </span>
                  <p className="text-(--black-ink) font-sans text-lg">
                    {object.metadata.collectedBy}
                  </p>
                </div>
                <div>
                  <span className="text-(--soft-soil) font-medium text-sm block mb-2">
                    Year added:
                  </span>
                  <p className="text-(--black-ink) font-sans text-lg">
                    {object.metadata.yearCollected}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-(--soft-soil) font-medium text-sm block mb-2">
                    Region:
                  </span>
                  <p className="text-(--black-ink) font-sans text-lg">
                    {object.metadata.region}
                  </p>
                </div>
              </div>

              {/* Themes */}
              <div>
                <span className="text-(--soft-soil) font-medium text-sm block mb-3">
                  Themes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {object.metadata.themes.map((theme, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-(--fungal-gray) text-(--black-ink) 
                               rounded-full text-sm font-sans uppercase tracking-wide"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              {cluster && (
                <div>
                  <span className="text-(--soft-soil) font-medium text-sm block mb-2">
                    Category:
                  </span>
                  <p className="text-(--black-ink) font-sans text-lg">
                    {cluster.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {similarObjects.length > 0 && (
          <div className="border-t border-(--fungal-gray) pt-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-(--black-ink) mb-6">
              Related Objects
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {similarObjects.map((similarObj) => (
                <button
                  key={similarObj.id}
                  onClick={() => {
                    onObjectClick(similarObj);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group text-left bg-(--driftwood-tan) rounded-lg p-4 
                           hover:bg-(--wax-amber)/20 transition-all duration-300 
                           border-2 border-transparent hover:border-(--moss-green)"
                >
                  <div
                    className="w-full aspect-square bg-(--cloud-white) rounded mb-3 
                                overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src={getObjectImage(similarObj.id)}
                      alt={similarObj.name}
                      className="w-full h-full object-cover group-hover:scale-110 
                               transition-transform duration-300"
                    />
                  </div>
                  <h3
                    className="font-serif text-sm md:text-base font-semibold text-(--black-ink) 
                               group-hover:text-(--moss-green) transition-colors mb-1"
                  >
                    {similarObj.name}
                  </h3>
                  <p className="text-(--soft-soil) text-xs font-sans line-clamp-2">
                    {similarObj.shortTagline}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-(--fungal-gray) flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-(--moss-green) text-white rounded-full 
                     font-sans font-medium hover:bg-[#5a6a4d] transition-colors 
                     uppercase tracking-wide"
          >
            Return to Archive
          </button>
        </div>
      </div>
    </section>
  );
}
