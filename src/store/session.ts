import { User } from 'firebase/auth';
import { StateCreator } from 'zustand';

import { auth } from '@/services/firebase';

export interface SessionSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createSessionSlice: StateCreator<SessionSlice> = set => ({
  user: auth.currentUser,
  setUser: (user: User | null) => set({ user }),
});
