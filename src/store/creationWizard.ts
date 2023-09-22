import { StateCreator } from 'zustand';

export interface CreationWizardSlice {
  name: string;
  setName: (name: string) => void;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  image: string;
  setImage: (image: string) => void;
}

export const createCreationWizardSlice: StateCreator<
  CreationWizardSlice
> = set => ({
  name: '',
  setName: (name: string) => set({ name }),
  startDate: new Date(),
  setStartDate: (startDate: Date) => set({ startDate }),
  tags: [],
  setTags: (tags: string[]) => set({ tags }),
  image: '',
  setImage: (image: string) => set({ image }),
});
