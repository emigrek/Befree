import { StateCreator } from 'zustand';

export type AddictionCreatorSlice = AddictionCreatorSliceState &
  AddictionCreatorSliceActions;

export interface AddictionCreatorSliceState {
  name: string;
  startDate: Date;
  image: string | null;
  loading: boolean;
}

export interface AddictionCreatorSliceActions {
  setName: (name: string) => void;
  setStartDate: (startDate: Date) => void;
  setImage: (image: string | null) => void;
  reset: () => void;
  setLoading: (loading: boolean) => void;
}

const initialState: AddictionCreatorSliceState = {
  name: '',
  startDate: new Date(),
  image: null,
  loading: false,
};

export const createAddictionCreatorSlice: StateCreator<
  AddictionCreatorSlice
> = set => ({
  name: '',
  setName: (name: string) => set({ name }),
  startDate: new Date(),
  setStartDate: (startDate: Date) => set({ startDate }),
  image: null,
  setImage: (image: string | null) => set({ image }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  reset: () => set(initialState),
});
