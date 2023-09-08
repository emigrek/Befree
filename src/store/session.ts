import { User } from 'firebase/auth';
import { StateCreator } from 'zustand';

export interface SessionSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createSessionSlice: StateCreator<SessionSlice> = set => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
});
