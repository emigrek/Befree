import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { StateCreator } from 'zustand';

export interface SessionSlice {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const createSessionSlice: StateCreator<SessionSlice> = set => ({
  user: null,
  setUser: (user: FirebaseAuthTypes.User | null) => set({ user }),
  loading: true,
  setLoading: (loading: boolean) => set({ loading }),
});
