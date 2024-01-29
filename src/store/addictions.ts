import { produce } from 'immer';
import { StateCreator } from 'zustand';

export interface AddictionSorting {
  direction: 'asc' | 'desc';
  field: keyof Addiction;
}

export interface AddictionsSlice {
  sorting: AddictionSorting;
  addictions: Addiction[];
  hiddenAddictions: Addiction[];
  addictionsLoading: boolean;
  getAddiction: (id: string) => Addiction | null;
  setSorting: (sorting: AddictionSorting) => void;
  setAddictions: (addictions: Addiction[]) => void;
  addAddiction: (addiction: Addiction) => void;
  editAddiction: (id: string, addiction: Partial<Addiction>) => void;
  removeAddiction: (id: string) => void;
  setAddictionsLoading: (addictionsLoading: boolean) => void;
}

export const createAddictionsSlice: StateCreator<AddictionsSlice> = (
  set,
  get,
) => ({
  sorting: {
    direction: 'asc',
    field: 'createdAt',
  },
  addictions: [],
  hiddenAddictions: [],
  addictionsLoading: false,
  getAddiction: (id: string) => {
    const addictions = get().addictions;
    const hiddenAddictions = get().hiddenAddictions;
    return (
      addictions.find((addiction: Addiction) => addiction.id === id) ||
      hiddenAddictions.find((addiction: Addiction) => addiction.id === id) ||
      null
    );
  },
  setSorting: (sorting: AddictionSorting) => set({ sorting }),
  setAddictions: (addictions: Addiction[]) =>
    set(
      produce(state => {
        state.addictions = addictions.filter(addiction => !addiction.hidden);
        state.hiddenAddictions = addictions.filter(
          addiction => addiction.hidden,
        );
        return state;
      }),
    ),
  addAddiction: (addiction: Addiction) =>
    set(
      produce(state => {
        state.addictions.push(addiction);
        return state;
      }),
    ),
  editAddiction: (id: string, addiction: Partial<Addiction>) => {
    set(
      produce(state => {
        const a = state.addictions.find(
          (addiction: Addiction) => addiction.id === id,
        );

        if (!a) return;

        Object.assign(a, addiction);
        return state;
      }),
    );
  },
  removeAddiction: (id: string) => {
    set(
      produce(state => {
        state.addictions = state.addictions.filter(
          (addiction: Addiction) => addiction.id !== id,
        );

        return state;
      }),
    );
  },
  setAddictionsLoading: (addictionsLoading: boolean) =>
    set({ addictionsLoading }),
});

export const getSortingFunction = (sorting: AddictionSorting) => {
  return (a: Addiction, b: Addiction) => {
    const { field, direction } = sorting;

    const aField = a[field];
    const bField = b[field];

    if (aField == null || bField == null) {
      return 0;
    }

    const comparingDates = aField instanceof Date && bField instanceof Date;
    const comparingStrings =
      typeof aField === 'string' && typeof bField === 'string';
    const comparingNumbers =
      typeof aField === 'number' && typeof bField === 'number';

    if (comparingDates) {
      const aDate = new Date(aField as Date);
      const bDate = new Date(bField as Date);

      return direction === 'asc'
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    } else if (comparingStrings) {
      const aString = aField as string;
      const bString = bField as string;

      return direction === 'asc'
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    } else if (comparingNumbers) {
      const aNumber = aField as number;
      const bNumber = bField as number;

      return direction === 'asc' ? aNumber - bNumber : bNumber - aNumber;
    } else {
      return 0;
    }
  };
};
