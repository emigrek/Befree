import React from 'react';

import { Locked } from './Locked';

import { LocalAuthLayout } from '@/components/layouts/LocalAuthLayout';
import { Addictions } from '@/components/screens/Addictions';

const HiddenAddictions = () => {
  return (
    <LocalAuthLayout
      lockedComponent={localAuthenticate => (
        <Locked localAuthenticate={localAuthenticate} />
      )}
    >
      <Addictions hidden />
    </LocalAuthLayout>
  );
};

export { HiddenAddictions };
