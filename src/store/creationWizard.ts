import { StateCreator } from 'zustand';

export type CreationWizardSlice = CreationWizardSliceState &
  CreationWizardSliceActions;

export interface CreationWizardSliceState {
  name: string;
  startDate: Date;
  image: string | null;
  loading: boolean;
}

export interface CreationWizardSliceActions {
  setName: (name: string) => void;
  setStartDate: (startDate: Date) => void;
  setImage: (image: string | null) => void;
  reset: () => void;
  setLoading: (loading: boolean) => void;
}

const initialState: CreationWizardSliceState = {
  name: '',
  startDate: new Date(),
  image: null,
  loading: false,
};

export const createCreationWizardSlice: StateCreator<
  CreationWizardSlice
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
