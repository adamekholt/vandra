import { create } from "zustand";

type LengthRange = [number, number | null] | null;

type MapState = {
  search: string;
  filters: string[];
  lengthRange: LengthRange;

  draftFilters: string[];
  draftLengthRange: LengthRange;

  trails: any[];
  filteredTrails: any[];

  setTrails: (trails: any[]) => void;

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

    const filtered = trails.filter((t) => {
      const matchesType =
        draftFilters.length === 0 ||
        draftFilters.includes(t.type);

      const matchesLength =
        !draftLengthRange ||
        (t.length_m >= draftLengthRange[0] &&
          (draftLengthRange[1] === null ||
            t.length_m <= draftLengthRange[1]));

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