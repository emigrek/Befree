import { produce } from 'immer';
import { StateCreator } from 'zustand';

export interface AddictionSorting {
  function: (a: Addiction, b: Addiction) => number;
  direction: 'asc' | 'desc';
  field: keyof Addiction;
}

export interface AddictionsSlice {
  addictions: Addiction[];
  setAddictions: (addictions: Addiction[]) => void;
  add: (addiction: Addiction) => void;
  edit: (id: string, addiction: Partial<Addiction>) => void;
  remove: (id: string) => void;
  addRelapse: (id: string, date: Date) => void;
  removeRelapse: (id: string, date: Date) => void;
  sorting: AddictionSorting;
  setSorting: (sorting: AddictionSorting) => void;
}

export const createAddictionsSlice: StateCreator<AddictionsSlice> = (
  set,
  get,
) => ({
  addictions: [],
  setAddictions: (addictions: Addiction[]) => set({ addictions }),
  add: (addiction: Addiction) =>
    set(
      produce(state => {
        state.addictions = [...state.addictions, addiction].sort(
          state.sorting.function,
        );

        return state;
      }),
    ),
  edit: (id: string, addiction: Partial<Addiction>) => {
    set(
      produce(state => {
        const a = state.addictions.find(
          (addiction: Addiction) => addiction.id === id,
        );

        if (!a) return;

        Object.assign(a, addiction);

        state.addictions = state.addictions.sort(state.sorting.function);

        return state;
      }),
    );
  },
  remove: (id: string) => {
    set(
      produce(state => {
        state.addictions = state.addictions.filter(
          (addiction: Addiction) => addiction.id !== id,
        );

        return state;
      }),
    );
  },
  addRelapse: (id: string, date: Date) => {
    set(
      produce(state => {
        const addiction = state.addictions.find(
          (addiction: Addiction) => addiction.id === id,
        );

        if (!addiction) return;

        addiction.relapses.push(date);

        state.addictions = state.addictions.sort(state.sorting.function);

        return state;
      }),
    );
  },
  removeRelapse: (id: string, date: Date) => {
    set(
      produce(state => {
        const addiction = state.addictions.find(
          (addiction: Addiction) => addiction.id === id,
        );

        if (!addiction) return;

        addiction.relapses = addiction.relapses.filter(
          (relapse: Date) => relapse.getTime() !== date.getTime(),
        );

        state.addictions = state.addictions.sort(state.sorting.function);

        return state;
      }),
    );
  },
  sorting: {
    function: (a: Addiction, b: Addiction) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    },
    direction: 'desc',
    field: 'createdAt',
  },
  setSorting: (sorting: AddictionSorting) => set({ sorting }),
});
