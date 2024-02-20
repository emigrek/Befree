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
    date: 'Date',
    hour: 'Hour',
    uploadingImage: 'Uploading image',
    note: 'Note',
    emptyNote: 'No note left',
    startedAt: 'Added at',
    longestAbstinenceEnd: 'Longest abstinence ended',
    hidden: 'Hidden',
  },
  goals: {
    'ten-minutes': '10 minutes',
    'thirty-minutes': '30 minutes',
    'one-hour': '1 hour',
    'three-hours': '3 hours',
    'half-day': 'Half-day',
    day: 'Day',
    'three-days': '3 days',
    week: 'Week',
    month: 'Month',
    'three-months': '3 months',
    quarter: 'Quarter',
    'half-year': 'Half-year',
    'nine-months': '9 months',
    year: 'Year',
  },
  validation: {
    name: {
      max: 'Max %{max} characters',
      min: 'Min %{min} characters',
    },
    note: {
      max: 'Max %{max} characters',
    },
  },
  screens: {
    home: {
      label: 'Home',
    },
    notifications: {
      label: 'Notifications',
      notificationsPermissions: 'Notifications permissions',
      achievementsNotifications: 'Achievements notifications',
      turnNotificationsOn: 'Turn notifications on',
      turnNotificationsOff: 'Turn notifications off',
      notificationsCount: '%{count} notifications',
      empty: 'No notifications',
    },
    addictions: {
      label: 'Addictions',
      commitment: 'I decide to end with:',
      empty: 'No addictions, start better life by adding one!',
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
  },
  modals: {
    relapsecreator: {
      label: 'Add relapse',
    },
    addictioncreator: {
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
      relapses: {
        label: 'Relapses',
        timeline: {
          title: 'Timeline',
        },
        list: {
          title: 'Last relapses',
          timeSectionTitles: {
            today: 'Today',
            yesterday: 'Yesterday',
            last7Days: 'Last 7 days',
            last30Days: 'Last 30 days',
          },
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
          delete: {
            name: 'Delete',
            description: 'Delete addiction (irreversible)',
          },
        },
        sections: {
          privacy: 'Privacy',
          management: 'Management',
        },
      },
    },
    hiddenaddictions: {
      label: 'Hidden addictions',
      locked: {
        title: 'Use local authorization to unlock',
      },
    },
    addictionedit: {
      label: 'Edit addiction',
      editing: 'Editing...',
    },
    relapseedit: {
      label: 'Edit relapse',
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
        relapses: 'Last relapse',
        name: 'Name',
      },
    },
    achievement: {
      label: 'Achievement',
    },
    relapse: {
      label: 'Relapse %{addictionName}',
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
    dailyQuote: {
      title: 'Daily quote',
      description: 'Daily motivation',
    },
    greeting: {
      morning: 'Good morning, %{name} 👋',
      afternoon: 'Good afternoon, %{name} 👋',
      evening: 'Good evening, %{name} 👋',
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
