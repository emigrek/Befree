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
    goal: string;
    relapse: string;
    remove: string;
    save: string;
    name: string;
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
      uploading: {
        title: string;
      };
    };
  };
  modals: {
    add: {
      label: string;
    };
    addiction: {
      progress: {
        label: string;
      };
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
    sorting: {
      fieldTitle: string;
      directionTitle: string;
      directions: {
        asc: string;
        desc: string;
      };
      fields: {
        name: string;
        lastRelapse: string;
        createdAt: string;
      };
    };
    edit: {
      changeImage: string;
      removeImage: string;
    };
  };
  widgets: {
    fastCreate: {
      title: string;
      description: string;
      presetNames: string[];
    };
  };
}
