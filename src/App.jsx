import { useState, useEffect, useRef } from "react";
import Hero from "./components/Hero";
import MainArchive from "./components/MainArchive";
import BrowseThemes from "./components/BrowseThemes";
import StoryView from "./components/StoryView";
import data from "./data/data.json";
import audio1 from "./assets/audio1.mp3";

function App() {
  const [selectedObject, setSelectedObject] = useState(null);
  const [highlightedTheme, setHighlightedTheme] = useState(null);
  const objects = data.objects.filter((obj) => obj.id !== "rusted-house-key");
  const backgroundAudioRef = useRef(null);

  // Manage background audio based on view state
  useEffect(() => {
    if (backgroundAudioRef.current) {
      if (selectedObject) {
        // Pause background audio when viewing a story
        backgroundAudioRef.current.pause();
      } else {
        // Play/resume background audio on main site (including initial load)
        backgroundAudioRef.current.play().catch((error) => {
          // Handle autoplay restrictions - user interaction may be required
          console.log("Audio autoplay prevented:", error);
        });
      }
    }
  }, [selectedObject]);

  const handleObjectClick = (object) => {
    setSelectedObject(object);
  };

  const handleCloseStory = () => {
    setSelectedObject(null);
    // Scroll back to archive section
    setTimeout(() => {
      const archiveSection = document.getElementById("main-archive");
      if (archiveSection) {
        archiveSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleThemeClick = (themeCard) => {
    setHighlightedTheme(themeCard.id);
    // Clear highlight after 3 seconds
    setTimeout(() => {
      setHighlightedTheme(null);
    }, 3000);
  };

  // If an object is selected, show story view instead of main content
  if (selectedObject) {
    return (
      <div className="min-h-screen">
        <StoryView
          object={selectedObject}
          objects={objects}
          onClose={handleCloseStory}
          onObjectClick={handleObjectClick}
        />
        {/* Footer */}
        <footer className="bg-(--black-ink) text-(--cloud-white) py-8 md:py-12 px-6 mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <p className="font-serif text-lg md:text-xl text-(--cloud-white)">
                  Carrier Bag Archive · 2057
                </p>
                <p className="font-sans text-sm md:text-base text-(--soft-soil)">
                  A speculative archive of resilient futures
                </p>
              </div>
              <div className="pt-4 border-t border-(--soft-soil)/20">
                <p className="font-sans text-xs md:text-sm text-(--soft-soil)">
                  Made with <span className="text-(--wax-amber)">❤️</span> by
                  Derrick Agyemang
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Background audio for main site */}
      <audio ref={backgroundAudioRef} src={audio1} loop />
      <Hero />

      <MainArchive
        objects={objects}
        onObjectClick={handleObjectClick}
        highlightedTheme={highlightedTheme}
        onClearTheme={() => setHighlightedTheme(null)}
      />

      <BrowseThemes onThemeClick={handleThemeClick} />

      {/* Footer */}
      <footer className="bg-(--black-ink) text-(--cloud-white) py-8 md:py-12 px-6 mt-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="font-serif text-lg md:text-xl text-(--cloud-white)">
                Carrier Bag Archive · 2057
              </p>
              <p className="font-sans text-sm md:text-base text-(--soft-soil)">
                A speculative archive of resilient futures
              </p>
            </div>
            <div className="pt-4 border-t border-(--soft-soil)/20">
              <p className="font-sans text-xs md:text-sm text-(--soft-soil)">
                Made with <span className="text-(--wax-amber)">❤️</span> by
                Derrick Agyemang
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
