import { getObjectImage } from "../utils/images";
import bagImage from "../assets/bag.png";

export default function CarrierBag({
  objects,
  onObjectClick,
  isOrbiting,
  onToggleOrbit,
  onStopOrbiting,
  highlightedObjectIds = [],
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[600px]">
      {/* Bag Illustration */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ pointerEvents: isOrbiting ? "none" : "auto" }}
      >
        <img
          src={bagImage}
          alt="Carrier bag"
          className={`w-[500px] h-auto transition-all duration-300 ${
            !isOrbiting ? "animate-float" : "transition-opacity"
          }`}
          style={{ opacity: isOrbiting ? 0.3 : 1, pointerEvents: "none" }}
        />

        {!isOrbiting && (
          <div className="mt-6 text-center animate-fade-in">
            <button
              onClick={onToggleOrbit}
              className="px-6 py-3 bg-(--moss-green) text-(--cloud-white) 
                       rounded-full font-sans text-sm font-medium 
                       hover:bg-(--moss-green)/90 transition-all duration-300 
                       shadow-lg hover:shadow-xl hover:scale-105
                       border border-(--moss-green)/20"
              aria-label="Explore objects"
            >
              Explore Objects
            </button>
          </div>
        )}
      </div>

      {/* Orbiting Objects Container */}
      <div
        className="absolute inset-0"
        style={{
          transform: "translate(0, 0)",
          pointerEvents: isOrbiting ? "auto" : "none",
          zIndex: isOrbiting ? 15 : 5,
        }}
      >
        {objects.map((obj, index) => {
          const initialAngle = (index / objects.length) * 360;
          const radius = 220;
          const duration = 15 + index * 0.5; // Vary speed slightly per object
          const isHighlighted = highlightedObjectIds.includes(obj.id);

          return (
            <div
              key={obj.id}
              className="absolute top-1/2 left-1/2 group cursor-pointer"
              style={{
                transform: isOrbiting
                  ? `rotate(${initialAngle}deg) translateX(${radius}px) rotate(-${initialAngle}deg)`
                  : "translate(-50%, -50%)",
                transition: isOrbiting
                  ? "none"
                  : "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                animation: isOrbiting
                  ? `orbit-${index} ${duration}s linear infinite`
                  : "none",
                "--initial-angle": `${initialAngle}deg`,
                "--radius": `${radius}px`,
                "--duration": `${duration}s`,
                zIndex: isOrbiting ? 20 : 10,
                pointerEvents: "auto",
              }}
              onClick={() => onObjectClick(obj)}
            >
              {/* Object Icon */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`w-full h-full rounded-full bg-(--cloud-white) 
                              shadow-lg border-2 
                              flex items-center justify-center overflow-hidden
                              group-hover:border-(--moss-green) group-hover:shadow-xl
                              group-hover:scale-110 transition-all duration-300
                              ${
                                isHighlighted
                                  ? "border-(--moss-green) shadow-xl animate-pulse-glow"
                                  : "border-(--moss-green)/30"
                              }`}
                >
                  <img
                    src={getObjectImage(obj.id)}
                    alt={obj.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Label */}
                {isOrbiting && (
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                                whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <div
                      className="bg-(--black-ink)/90 text-white text-xs px-3 py-1 
                                  rounded font-sans backdrop-blur-sm text-center max-w-[300px]"
                    >
                      {obj.name}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isOrbiting && (
        <div className="absolute bottom-0 left-1/2 transform -mb-6 -translate-x-1/2 z-30 animate-fade-in">
          <button
            onClick={onStopOrbiting}
            className="px-6 py-3 bg-(--black-ink) text-(--cloud-white) 
                     rounded-full font-sans text-sm font-medium 
                     hover:bg-(--black-ink)/90 transition-all duration-300 
                     shadow-lg hover:shadow-xl hover:scale-105
                     border border-(--black-ink)/20"
            aria-label="Return to default view"
          >
            Return to Bag
          </button>
        </div>
      )}

      <style>
        {`
          ${objects
            .map((obj, index) => {
              const initialAngle = (index / objects.length) * 360;
              const radius = 220;

              return `
            @keyframes orbit-${index} {
              from {
                transform: rotate(${initialAngle}deg) translateX(${radius}px) rotate(-${initialAngle}deg);
              }
              to {
                transform: rotate(${
                  initialAngle + 360
                }deg) translateX(${radius}px) rotate(-${initialAngle + 360}deg);
              }
            }
          `;
            })
            .join("")}
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        `}
      </style>
    </div>
  );
}
