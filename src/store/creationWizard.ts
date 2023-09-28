import { StateCreator } from 'zustand';

export type CreationWizardSlice = CreationWizardSliceState &
  CreationWizardSliceActions;

export interface CreationWizardSliceState {
  name: string;
  startDate: Date;
  image: string | null;
}

export interface CreationWizardSliceActions {
  setName: (name: string) => void;
  setStartDate: (startDate: Date) => void;
  setImage: (image: string) => void;
  reset: () => void;
}

const initialState: CreationWizardSliceState = {
  name: '',
  startDate: new Date(),
  image: null,
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
  reset: () => set(initialState),
});
