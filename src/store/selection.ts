import { StateCreator } from 'zustand';

export interface SelectionSlice<T> {
  selected: T[];
  set: (items: T[]) => void;
  add: (item: T) => void;
  remove: (item: T) => void;
  clear: () => void;
  isSelected: (item: T) => boolean;
  toggle: (item: T) => void;
}

export const createSelectionSlice =
  <T>(): StateCreator<SelectionSlice<T>> =>
  (set, get) => ({
    selected: [],
    set: (items: T[]) => set({ selected: items }),
    add: (item: T) =>
      set(state => {
        if (!state.selected.includes(item)) {
          return { ...state, selected: [...state.selected, item] };
        }
        return state;
      }),
    remove: (item: T) =>
      set(state => ({
        ...state,
        selected: state.selected.filter(i => i !== item),
      })),
    clear: () => set({ selected: [] }),
    isSelected: (item: T) => {
      const state = get();
      return state.selected.includes(item);
    },
    toggle: (item: T) =>
      set(state => {
        const isSelected = state.selected.includes(item);
        if (isSelected) {
          return {
            ...state,
            selected: state.selected.filter(i => i !== item),
          };
        } else {
          return {
            ...state,
            selected: [...state.selected, item],
          };
        }
      }),
  });
