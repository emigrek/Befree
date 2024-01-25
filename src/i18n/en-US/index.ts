import { Translation } from '../types';

const enUS: Translation = {
  labels: {
    signIn: 'Sign in',
    signOut: 'Sign out',
    signOutConfirmationMessage: 'Are you sure you want to sign out?',
    close: 'Close',
    cancel: 'No',
    confirm: 'Yes',
    account: 'Account',
    on: 'On',
    off: 'Off',
    next: 'Next',
    add: 'Add',
    back: 'Back',
    freeFor: 'Free for...',
    goal: 'Goal',
    relapse: 'Relapse',
    remove: 'Abandon',
    save: 'Save',
    name: 'Name',
    pickImage: 'Pick image',
    removeImage: 'Remove image',
    empty: 'Empty',
  },
  goals: {
    'ten-minutes': '10 minutes',
    'thirty-minutes': '30 minutes',
    'one-hour': '1 hour',
    'half-day': 'Half-day',
    day: 'Day',
    'three-days': '3 days',
    week: 'Week',
    month: 'Month',
    quarter: 'Quarter',
    'half-year': 'Half-year',
    year: 'Year',
  },
  banners: {
    offline: {
      title: 'No internet connection',
      description: 'Some features may be unavailable',
      acknowledge: 'Got it',
    },
  },
  validation: {
    name: {
      max: 'Max 16 characters',
      min: 'Min 2 characters',
    },
  },
  screens: {
    home: {
      label: 'Home',
      gretting: 'Hello, %{name}! 👋',
    },
    notifications: {
      label: 'Notifications',
      notificationsPermissions: 'Notifications permissions',
      achievementsNotifications: 'Achievements notifications',
      turnNotificationsOn: 'Turn notifications on',
      turnNotificationsOff: 'Turn notifications off',
      notificationsCount: '%{count} notifications',
    },
    addictions: {
      label: 'Addictions',
      commitment: 'I decide to end with:',
    },
    authentication: {
      title: 'Authentication',
      subtitle: 'Please sign in to save your data across devices',
      errorMessage: 'There was an error, try again',
      cancelMessage: `You've cancelled signing in`,
      dismissMessage: `You've dismissed sign in window`,
      helperText: `Internet connection is required to continue`,
    },
    onboarding: {
      getStarted: 'Get started',
      skip: 'Skip',
      titles: [
        'Welcome',
        'Track Progress',
        'Set Goals',
        'Daily Motivation',
        'Ready to Begin',
      ],
      descriptions: [
        `Welcome to Befree, your companion on the journey to breaking free from addiction.`,
        'Use our tracking tools to monitor your progress and celebrate each milestone along the way.',
        'Define your personal goals and aspirations. Breaking free from addiction is a step towards achieving them.',
        'Receive daily motivational quotes and messages to keep you inspired on your path to recovery.',
        "You're all set to start your journey towards a healthier, addiction-free life. Let's take that first step together!",
      ],
    },
    creationWizard: {
      nameAndImage: {
        title: 'Name and image',
        description: 'What addiction do you want to break free from?',
        placeholder: 'e.g. Alcohol',
        connectionError: 'Unavailable without internet connection',
      },
      startDate: {
        title: 'Start date',
        description: 'When did you start your journey?',
      },
      uploading: {
        title: 'Uploading...',
      },
    },
  },
  modals: {
    add: {
      label: 'Add addiction',
    },
    addiction: {
      progress: {
        label: 'Progress',
        timeline: {
          distinctPast: 'Distinguish past dates',
          invert: 'Invert colors',
        },
      },
      achievements: {
        label: 'Achievements',
        achieved: 'Achieved %{achievedAt} ago',
        notAchieved: 'By %{goalAt}',
      },
      notifications: {
        label: 'Notifications',
      },
      settings: {
        label: 'Settings',
        list: {
          hidden: {
            name: 'Hidden',
            description:
              'Hidden addictions are protected by local authorization',
          },
        },
        sections: {
          privacy: 'Privacy',
        },
      },
    },
    hiddenaddictions: {
      label: 'Hidden addictions',
      locked: {
        title: 'Use local authorization to unlock',
      },
    },
    edit: {
      label: 'Edit',
      editing: 'Editing...',
    },
    sorting: {
      label: 'Sorting',
      fieldTitle: 'Sort by',
      directionTitle: 'Direction',
      directions: {
        asc: 'Ascending',
        desc: 'Descending',
      },
      fields: {
        createdAt: 'Creation date',
        lastRelapse: 'Last relapse',
        name: 'Name',
      },
    },
    achievement: {
      label: 'Achievement',
    },
  },
  bottomSheets: {
    theme: {
      modeTitle: 'Dark mode',
      themeTitle: 'Dark theme',
      lightsOut: 'Lights out',
      dim: 'Dim',
      device: 'Use device settings',
    },
  },
  widgets: {
    fastCreate: {
      title: 'Fast create',
      description: 'Tap to add, hold to edit',
      presetNames: [
        'Alcohol',
        'Nicotine',
        'Caffe',
        'Food',
        'Shopping',
        'Games',
        'Internet',
        'Twitch.tv',
        'Youtube',
        'Facebook',
        'Phone',
        'Work',
        'Drugs',
        'Sex',
      ],
    },
  },
  notifications: {
    achievement: {
      title: 'You got this!',
      body: `You are free from %{name} for %{goalType} now!`,
    },
  },
};

export default enUS;
