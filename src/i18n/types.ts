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
    date: string;
    hour: string;
    uploadingImage: string;
    note: string;
    emptyNote: string;
    startedAt: string;
    longestAbstinenceEnd: string;
    hidden: string;
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
    };
    notifications: {
      label: string;
      notificationsPermissions: string;
      achievementsNotifications: string;
      turnNotificationsOn: string;
      turnNotificationsOff: string;
      notificationsCount: string;
      empty: string;
    };
    addictions: {
      label: string;
      commitment: string;
      empty: string;
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
    note: {
      max: string;
    };
  };
  modals: {
    addictioncreator: {
      label: string;
    };
    relapsecreator: {
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
      relapses: {
        label: string;
        timeline: {
          title: string;
        };
        list: {
          title: string;
          timeSectionTitles: {
            today: string;
            yesterday: string;
            last7Days: string;
            last30Days: string;
          };
        };
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
          delete: {
            name: string;
            description: string;
          };
        };
        sections: {
          privacy: string;
          management: string;
        };
      };
    };
    hiddenaddictions: {
      label: string;
      locked: {
        title: string;
      };
    };
    addictionedit: {
      label: string;
      editing: string;
    };
    relapseedit: {
      label: string;
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
    relapse: {
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
    dailyQuote: {
      title: string;
      description: string;
    };
    greeting: {
      morning: string;
      afternoon: string;
      evening: string;
    };
  };
  notifications: {
    achievement: {
      title: string;
      body: string;
    };
  };
}
