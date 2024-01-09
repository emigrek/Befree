import { NetInfoState } from '@react-native-community/netinfo';
import { StateCreator } from 'zustand';

export interface NetInfoSlice {
  netState: NetInfoState | undefined;
  setNetState: (netState: NetInfoState) => void;
}

export const createNetInfoSlice: StateCreator<NetInfoSlice> = set => ({
  netState: undefined,
  setNetState: (netState: NetInfoState) => set({ netState }),
});
