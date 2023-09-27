import { StateCreator } from 'zustand';

export interface CreationWizardSlice {
  name: string;
  setName: (name: string) => void;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  image: string | null;
  setImage: (image: string) => void;
}

export const createCreationWizardSlice: StateCreator<
  CreationWizardSlice
> = set => ({
  name: '',
  setName: (name: string) => set({ name }),
  startDate: new Date(),
  setStartDate: (startDate: Date) => set({ startDate }),
  image: null,
  setImage: (image: string | null) => set({ image }),
});
