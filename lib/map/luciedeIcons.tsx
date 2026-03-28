import { DivIcon } from "leaflet";
import { renderToString } from "react-dom/server";
import { Pin, Locate, Circle,  Navigation, FlagTriangleRight } from "lucide-react";

export function trailIcon(color: string = "green"): DivIcon {
  return new DivIcon({
    className: "",
    html: renderToString(
      <FlagTriangleRight size={28} color={color} fill={color} />
    ),
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
}

export function pointIcon(): DivIcon {
  return new DivIcon({
    className: "",
    html: renderToString(
      <Circle size={10} fill="blue" stroke="none" />
    ),
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });
}

export function startIcon(): DivIcon {
  return new DivIcon({
    className: "",
    html: renderToString(
      <FlagTriangleRight size={20} fill="green" stroke="black" strokeWidth={2} />
    ),
    iconSize: [20, 20],
    iconAnchor: [10, 15],
  });
}

export function userIcon(): DivIcon {
  return new DivIcon({
    className: "",
    html: renderToString(
      <Locate size={20} fill="" />
    ),
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}


export function getTrailIcon(type: string): DivIcon {
  switch (type) {
    case "vandring":
      return trailIcon("green");
    case "track":
      return trailIcon("blue");
    case "path":
      return trailIcon("brown");
    default:
      return trailIcon("gray");
  }
}