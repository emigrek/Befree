export interface Translation {
  labels: {
    signIn: string;
    signOut: string;
    signOutConfirmationMessage: string;
    confirm: string;
    cancel: string;
    close: string;
    account: string;
    on: string;
    off: string;
  };
  screens: {
    notifications: {
      label: string;
    };
  };
  bottomSheets: {
    theme: {
      modeTitle: string;
      themeTitle: string;
      lightsOut: string;
      dim: string;
      device: string;
    };
  };
}
