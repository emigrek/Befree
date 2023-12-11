import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { StateCreator } from 'zustand';

export interface SessionSlice {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
}

export const createSessionSlice: StateCreator<SessionSlice> = set => ({
  user: auth().currentUser,
  setUser: (user: FirebaseAuthTypes.User | null) => set({ user }),
});
