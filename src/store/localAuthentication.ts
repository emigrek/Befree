import { StateCreator } from 'zustand';

export interface LocalAuthenticationSlice {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  authenticating: boolean;
  setAuthenticating: (authenticating: boolean) => void;
  hasHardware: boolean;
  setHasHardware: (hasHardware: boolean) => void;
}

export const createLocalAuthenticationSlice: StateCreator<
  LocalAuthenticationSlice
> = set => ({
  authenticated: false,
  setAuthenticated: (authenticated: boolean) => set({ authenticated }),
  authenticating: false,
  setAuthenticating: (authenticating: boolean) => set({ authenticating }),
  hasHardware: false,
  setHasHardware: (hasHardware: boolean) => set({ hasHardware }),
});
