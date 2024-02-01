import React, { FC } from 'react';
import { View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import style from './style';

import { Uploading } from '@/components/illustrations/Uploading';
import { Screen } from '@/components/ui/Screen';
import { Bold } from '@/components/ui/Text';

interface ImageUploadingProps {
  label: string;
  progress: number;
}

const ImageUploading: FC<ImageUploadingProps> = ({ label, progress }) => {
  return (
    <Screen style={style.screen}>
      <View style={style.container}>
        <Uploading />
        <View style={style.progressContainer}>
          <ProgressBar style={style.progress} progress={progress} />
        </View>
        <Bold variant="headlineSmall" style={style.texts}>
          {label}
        </Bold>
      </View>
    </Screen>
  );
};

export { ImageUploading };
