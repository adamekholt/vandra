import { create } from "zustand";

type LengthRange = [number, number | null] | null;

type MapState = {
  search: string;
  filters: string[];
  lengthRange: LengthRange;

  draftFilters: string[];
  draftLengthRange: LengthRange;

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

  setSearch: (search) => set({ search }),

  toggleDraftFilter: (filter) =>
    set((state) => ({
      draftFilters: state.draftFilters.includes(filter)
        ? state.draftFilters.filter((f) => f !== filter)
        : [...state.draftFilters, filter],
    })),

  setDraftLengthRange: (lengthRange) =>
    set({ draftLengthRange: lengthRange }),

  applyFilters: () =>
    set((state) => ({
      filters: state.draftFilters,
      lengthRange: state.draftLengthRange,
    })),

  resetFilters: () =>
    set({
      draftFilters: [],
      draftLengthRange: null,
      filters: [],
      lengthRange: null,
    }),
}));