import { useState, useMemo } from "react";
import CarrierBag from "./CarrierBag";
import SidebarIndex from "./SidebarIndex";
import data from "../data/data.json";

export default function MainArchive({
  objects,
  onObjectClick,
  highlightedTheme,
  onClearTheme,
}) {
  const [manuallyOrbiting, setManuallyOrbiting] = useState(false);
  const isOrbiting = !!highlightedTheme || manuallyOrbiting;

  const highlightedCluster = useMemo(() => {
    if (!highlightedTheme) return null;
    const themeCard = data.themeCards.find((t) => t.id === highlightedTheme);
    if (!themeCard) return null;
    const matchingCluster = data.archiveIndex.clusters.find((cluster) =>
      themeCard.objectIds.some((objId) => cluster.objectIds.includes(objId))
    );
    return matchingCluster ? matchingCluster.id : null;
  }, [highlightedTheme]);

  const handleToggleOrbit = () => {
    setManuallyOrbiting(!manuallyOrbiting);
  };

  const handleStopOrbiting = () => {
    setManuallyOrbiting(false);
    if (onClearTheme) {
      onClearTheme();
    }
  };

  const handleObjectClick = (obj) => {
    onObjectClick(obj);
  };

  const getHighlightedObjectIds = () => {
    if (!highlightedTheme) return [];
    const themeCard = data.themeCards.find((t) => t.id === highlightedTheme);
    return themeCard ? themeCard.objectIds : [];
  };

  return (
    <section
      id="main-archive"
      className="bg-(--driftwood-tan) py-12 md:py-16 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-(--black-ink) mb-4">
            The Archive
          </h2>
          <p className="text-(--soft-soil) text-lg max-w-2xl mx-auto font-sans">
            Browse objects from the index
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <SidebarIndex
            objects={objects}
            onObjectClick={handleObjectClick}
            highlightedCluster={highlightedCluster}
          />

          {/* Bag Visualization */}
          <div className="flex-1 bg-(--cloud-white) rounded-lg shadow-lg p-6 md:p-10">
            <CarrierBag
              objects={objects}
              onObjectClick={handleObjectClick}
              isOrbiting={isOrbiting}
              onToggleOrbit={handleToggleOrbit}
              onStopOrbiting={handleStopOrbiting}
              highlightedObjectIds={getHighlightedObjectIds()}
            />

            {/* Theme highlight message */}
            {isOrbiting && highlightedTheme && (
              <div className="mt-6 text-center animate-fade-in">
                <p className="text-(--moss-green) font-sans text-sm font-medium">
                  Objects highlighted from selected theme
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
