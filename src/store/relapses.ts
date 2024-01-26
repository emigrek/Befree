import { produce } from 'immer';
import { StateCreator } from 'zustand';

export interface RelapsesSlice {
  relapses: Relapse[];
  setRelapses: (relapses: Relapse[]) => void;
  addRelapse: (relapse: Relapse) => void;
  editRelapse: (id: string, relapse: Partial<Relapse>) => void;
  removeRelapse: (id: string) => void;
}

export const createRelapsesSlice: StateCreator<RelapsesSlice> = set => ({
  relapses: [],
  setRelapses: (relapses: Relapse[]) =>
    set(
      produce(state => {
        state.relapses = relapses;
        return state;
      }),
    ),
  addRelapse: (relapse: Relapse) =>
    set(
      produce(state => {
        state.relapses.push(relapse);
        return state;
      }),
    ),
  editRelapse: (id: string, relapse: Partial<Relapse>) => {
    set(
      produce(state => {
        const r = state.relapses.find((relapse: Relapse) => relapse.id === id);

        if (!r) return;

        Object.assign(r, relapse);
        return state;
      }),
    );
  },
  removeRelapse: (id: string) => {
    set(
      produce(state => {
        state.relapses = state.relapses.filter(
          (relapse: Relapse) => relapse.id !== id,
        );
        return state;
      }),
    );
  },
});
