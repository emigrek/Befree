import { produce } from 'immer';
import { StateCreator } from 'zustand';

export interface AddictionSorting {
  direction: 'asc' | 'desc';
  field: keyof Addiction;
}

export interface AddictionsSlice {
  sorting: AddictionSorting;
  setSorting: (sorting: AddictionSorting) => void;
  addictions: Addiction[];
  setAddictions: (addictions: Addiction[]) => void;
  add: (addiction: Addiction) => void;
  edit: (id: string, addiction: Partial<Addiction>) => void;
  remove: (id: string) => void;
  addRelapse: (id: string, date: Date) => void;
  removeRelapse: (id: string, date: Date) => void;
}

export const createAddictionsSlice: StateCreator<AddictionsSlice> = (
  set,
  get,
) => ({
  sorting: {
    direction: 'desc',
    field: 'name',
  },
  setSorting: (sorting: AddictionSorting) => set({ sorting }),
  addictions: [],
  setAddictions: (addictions: Addiction[]) =>
    set(
      produce(state => {
        state.addictions = addictions.sort(getSortingFunction(state.sorting));
        return state;
      }),
    ),
  add: (addiction: Addiction) =>
    set(
      produce(state => {
        state.addictions.push(addiction);
        state.addictions = state.addictions.sort(
          getSortingFunction(state.sorting),
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

        state.addictions = state.addictions.sort(
          getSortingFunction(state.sorting),
        );

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

        state.addictions = state.addictions.sort(
          getSortingFunction(state.sorting),
        );

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

        state.addictions = state.addictions.sort(
          getSortingFunction(state.sorting),
        );

        return state;
      }),
    );
  },
});

const getSortingFunction = (sorting: AddictionSorting) => {
  const { direction, field } = sorting;

  console.log(field, direction);

  if (field === 'createdAt') {
    return (a: Addiction, b: Addiction) => {
      if (direction === 'asc') {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }

      return b.createdAt.getTime() - a.createdAt.getTime();
    };
  } else {
    return (a: Addiction, b: Addiction) => {
      console.log(typeof a[field]);
      return 1;
    };
  }
};
