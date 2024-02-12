import { FC } from 'react';

import {
  Explore,
  Progress,
  PushNotifications,
  Target,
  Welcome,
} from '@/components/illustrations';
import { IllustrationProps } from '@/components/illustrations/types';
import i18n from '@/i18n';

export interface OnboardingPage {
  title: string;
  description: string;
  illustration: FC<IllustrationProps>;
}

export const onboardingPages: OnboardingPage[] = [
  {
    title: i18n.t(['screens', 'onboarding', 'titles'])[0],
    description: i18n.t(['screens', 'onboarding', 'descriptions'])[0],
    illustration: Welcome,
  },
  {
    title: i18n.t(['screens', 'onboarding', 'titles'])[1],
    description: i18n.t(['screens', 'onboarding', 'descriptions'])[1],
    illustration: Progress,
  },
  {
    title: i18n.t(['screens', 'onboarding', 'titles'])[2],
    description: i18n.t(['screens', 'onboarding', 'descriptions'])[2],
    illustration: Target,
  },
  {
    title: i18n.t(['screens', 'onboarding', 'titles'])[3],
    description: i18n.t(['screens', 'onboarding', 'descriptions'])[3],
    illustration: PushNotifications,
  },
  {
    title: i18n.t(['screens', 'onboarding', 'titles'])[4],
    description: i18n.t(['screens', 'onboarding', 'descriptions'])[4],
    illustration: Explore,
  },
];
