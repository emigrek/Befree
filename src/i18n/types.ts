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
    next: string;
    add: string;
    back: string;
    freeFor: string;
  };
  screens: {
    home: {
      gretting: string;
    };
    notifications: {
      label: string;
    };
    addictions: {
      label: string;
      goalTypes: {
        day: string;
        week: string;
        month: string;
        'half-year': string;
        year: string;
      };
    };
    authentication: {
      title: string;
      subtitle: string;
      errorMessage: string;
      dismissMessage: string;
      cancelMessage: string;
    };
    onboarding: {
      skip: string;
      getStarted: string;
      titles: string[];
      descriptions: string[];
    };
    creationWizard: {
      nameAndImage: {
        title: string;
        description: string;
        placeholder: string;
        nameError: string;
      };
      startDate: {
        title: string;
        description: string;
      };
    };
  };
  modals: {
    add: {
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
