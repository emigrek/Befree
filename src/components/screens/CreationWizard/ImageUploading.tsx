import React, { FC } from 'react';
import { View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import style from './style';

import { Uploading } from '@/components/illustrations/Uploading';
import { Screen } from '@/components/ui/Screen';
import { Bold } from '@/components/ui/Text';
import i18n from '@/i18n';

interface ImageUploadingProps {
  progress: number;
}

const ImageUploading: FC<ImageUploadingProps> = ({ progress }) => {
  return (
    <Screen style={style.screen}>
      <View style={style.container}>
        <Uploading />
        <View style={style.progressContainer}>
          <ProgressBar style={style.progress} progress={progress} />
        </View>
        <Bold variant="headlineSmall" style={style.texts}>
          {i18n.t(['screens', 'creationWizard', 'uploading', 'title'])}
        </Bold>
      </View>
    </Screen>
  );
};

export { ImageUploading };
