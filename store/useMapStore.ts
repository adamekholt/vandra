import { create } from "zustand";
import type { Trail } from "@/types/trail";

type State = {
  trails: Trail[];
  filteredTrails: Trail[];
};

type LengthRange = [number, number | null] | null;

type MapState = {
  search: string;
  filters: string[];
  lengthRange: LengthRange;

  draftFilters: string[];
  draftLengthRange: LengthRange;

  selectedTrailId: string | null;
  setSelectedTrailId: (id: string | null) => void;

  focusTrailId: string | null;
  setFocusTrailId: (id: string | null) => void;  

  trails: Trail[];
  filteredTrails: Trail[];
  setTrails: (trails: Trail[]) => void;
  

  setSearch: (s: string) => void;

  toggleDraftFilter: (f: string) => void;
  setDraftLengthRange: (l: LengthRange) => void;

  applyFilters: () => void;
  resetFilters: () => void;
};

export const useMapStore = create<MapState>((set, get) => ({
  search: "",
  filters: [],
  lengthRange: null,
  selectedTrailId: null,
  setSelectedTrailId: (id) => set({ selectedTrailId: id }),
  focusTrailId: null,
  setFocusTrailId: (id) => set({ focusTrailId: id }),
  draftFilters: [],
  draftLengthRange: null,

  trails: [],
  filteredTrails: [],

  setTrails: (trails) =>
    set({
      trails,
      filteredTrails: trails,
    }),

  setSearch: (search) => set({ search }),

  toggleDraftFilter: (filter) =>
    set((state) => ({
      draftFilters: state.draftFilters.includes(filter)
        ? state.draftFilters.filter((f) => f !== filter)
        : [...state.draftFilters, filter],
    })),

  setDraftLengthRange: (lengthRange) =>
    set({ draftLengthRange: lengthRange }),

  applyFilters: () => {
    const { trails, draftFilters, draftLengthRange, search } = get();

    const filtered = trails.filter((t: Trail) => {
      const matchesType =
        draftFilters.length === 0 ||
        draftFilters.includes(t.type ?? "");

      const matchesLength =
        !draftLengthRange ||
        (t.length_km >= draftLengthRange[0] &&
          (draftLengthRange[1] === null ||
            t.length_km <= draftLengthRange[1]));

      const matchesSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase());

      return matchesType && matchesLength && matchesSearch;
    });

    set({
      filters: draftFilters,
      lengthRange: draftLengthRange,
      filteredTrails: filtered,
    });
  },

  resetFilters: () => {
    const { trails } = get();

    set({
      draftFilters: [],
      draftLengthRange: null,
      filters: [],
      lengthRange: null,
      filteredTrails: trails,
    });
  },
}));