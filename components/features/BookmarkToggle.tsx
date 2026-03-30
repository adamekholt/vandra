// "use client";

// import { Bookmark } from "lucide-react";
// import { useMapStore } from "@/store/useMapStore";
// import { Button } from "../ui/button";

// export function BookmarkToggle({ trailId }: { trailId: string }) {
//   const favorites = useMapStore((s) => s.favorites);
//   const toggleFavorite = useMapStore((s) => s.toggleFavorite);

//   const isFavorite = favorites.includes(trailId);

//   return (
//     <Button variant={"secondary"}
//       onClick={() => toggleFavorite(trailId)}
//       className="rounded-lg bg-secondary"
//     >
//       <Bookmark
//         className={`h-5 w-5 ${
//           isFavorite ? "fill-primary text-primary" : "text-primary"
//         }`}
//       />
//     </Button>
//   );
// }