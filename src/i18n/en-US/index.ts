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
    freeFor: 'Free for %{time}',
    goal: 'Goal',
    relapse: 'Relapse',
    remove: 'Abandon',
  },
  screens: {
    home: {
      gretting: 'Hello, %{name}! 👋',
    },
    notifications: {
      label: 'Notifications',
    },
    addictions: {
      label: 'Addictions',
      goalTypes: {
        day: 'Day',
        week: 'Week',
        month: 'Month',
        'half-year': 'Half-year',
        year: 'Year',
      },
    },
    authentication: {
      title: 'Authentication',
      subtitle: 'Please sign in to save your data across devices',
      errorMessage: 'There was an error, try again',
      cancelMessage: `You've cancelled signing in`,
      dismissMessage: `You've dismissed sign in window`,
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
        nameError: 'Name is required',
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
      label: 'Addiction',
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
};

export default enUS;
