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
    pickImage: string;
    removeImage: string;
    empty: string;
  };
  goals: {
    'ten-minutes': string;
    'thirty-minutes': string;
    'one-hour': string;
    'half-day': string;
    day: string;
    'three-days': string;
    week: string;
    month: string;
    quarter: string;
    'half-year': string;
    year: string;
  };
  screens: {
    home: {
      label: string;
      gretting: string;
    };
    notifications: {
      label: string;
      notificationsPermissions: string;
      achievementsNotifications: string;
      turnNotificationsOn: string;
      turnNotificationsOff: string;
      notificationsCount: string;
    };
    addictions: {
      label: string;
      commitment: string;
    };
    authentication: {
      title: string;
      subtitle: string;
      errorMessage: string;
      dismissMessage: string;
      cancelMessage: string;
      helperText: string;
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
        connectionError: string;
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
  banners: {
    offline: {
      title: string;
      description: string;
      acknowledge: string;
    };
  };
  validation: {
    name: {
      min: string;
      max: string;
    };
  };
  modals: {
    add: {
      label: string;
    };
    addiction: {
      progress: {
        timeline: {
          distinctPast: string;
          invert: string;
        };
        label: string;
      };
      achievements: {
        label: string;
        achieved: string;
        notAchieved: string;
      };
      notifications: {
        label: string;
      };
      settings: {
        label: string;
        list: {
          hidden: {
            name: string;
            description: string;
          };
        };
        sections: {
          privacy: string;
        };
      };
    };
    hiddenaddictions: {
      label: string;
      locked: {
        title: string;
      };
    };
    edit: {
      label: string;
      editing: string;
    };
    sorting: {
      label: string;
      fieldTitle: string;
      directionTitle: string;
      directions: {
        asc: string;
        desc: string;
      };
      fields: {
        name: string;
        relapses: string;
        createdAt: string;
      };
    };
    achievement: {
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
  widgets: {
    fastCreate: {
      title: string;
      description: string;
      presetNames: string[];
    };
  };
  notifications: {
    achievement: {
      title: string;
      body: string;
    };
  };
}
