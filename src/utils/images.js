import beeWaxSeal from "../assets/bee-wax-seal.png";
import birdDrawing from "../assets/bird-drawing.png";
import busTicket from "../assets/bus-ticket.png";
import solarTile from "../assets/solar-tile.png";
import tidewater from "../assets/tidewater.png";
import feather from "../assets/feather.png";
import seed from "../assets/seed.png";
import handwovenMap from "../assets/handwoven-map.png";
import whistleShell from "../assets/whistle-shell.png";
import houseKey from "../assets/house-key.png";

export const getObjectImage = (objectId) => {
  const imageMap = {
    "bees-wax-seal": beeWaxSeal,
    "faded-bus-ticket-2034": busTicket,
    "childs-bird-drawing": birdDrawing,
    "moss-grown-solar-tile": solarTile,
    "preserved-tidewater-bottle": tidewater,
    feather: feather,
    "indigenous-seed": seed,
    "smell-path-map": handwovenMap,
    "whistle-shell": whistleShell,
    "rusted-house-key": houseKey,
  };

  return imageMap[objectId] || beeWaxSeal;
};
