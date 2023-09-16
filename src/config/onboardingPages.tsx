import { FC } from 'react';

import {
  Explore,
  Progress,
  PushNotifications,
  Target,
} from '@/components/illustrations';
import { Welcome } from '@/components/illustrations/Welcome';
import { IllustrationProps } from '@/components/illustrations/types';

export interface OnboardingPage {
  title: string;
  description: string;
  illustration: FC<IllustrationProps>;
}

export const onboardingPages: OnboardingPage[] = [
  {
    title: 'Welcome',
    description: `Welcome to Befree, your companion on the journey to breaking free from addiction.`,
    illustration: Welcome,
  },
  {
    title: 'Track Progress',
    description:
      'Use our tracking tools to monitor your progress and celebrate each milestone along the way.',
    illustration: Progress,
  },
  {
    title: 'Set Goals',
    description:
      'Define your personal goals and aspirations. Breaking free from addiction is a step towards achieving them.',
    illustration: Target,
  },
  {
    title: 'Daily Motivation',
    description:
      'Receive daily motivational quotes and messages to keep you inspired on your path to recovery.',
    illustration: PushNotifications,
  },
  {
    title: 'Ready to Begin',
    description:
      "You're all set to start your journey towards a healthier, addiction-free life. Let's take that first step together!",
    illustration: Explore,
  },
];
