import { StateCreator } from 'zustand';

export interface TimelineSlice {
  invert: boolean;
  setInvert: (invert: boolean) => void;
  distinctPast: boolean;
  setDistinctPast: (distinctPast: boolean) => void;
}

export const createTimelineSlice: StateCreator<TimelineSlice> = set => ({
  invert: true,
  setInvert: (invert: boolean) => set({ invert }),
  distinctPast: true,
  setDistinctPast: (distinctPast: boolean) => set({ distinctPast }),
});
