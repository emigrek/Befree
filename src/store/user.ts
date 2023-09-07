import { User } from 'firebase/auth';
import { StateCreator } from 'zustand';

export interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
}

export const createUserSlice: StateCreator<UserSlice> = set => ({
  user: null,
  setUser: (user: User) => set({ user }),
});
