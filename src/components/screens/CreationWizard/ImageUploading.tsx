import React, { FC } from 'react';
import { View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import style from './style';

import { Screen } from '@/components/ui/Screen';

interface ImageUploadingProps {
  progress: number;
}

const ImageUploading: FC<ImageUploadingProps> = ({ progress }) => {
  return (
    <Screen style={style.screen}>
      <View style={style.container}>
        <View style={style.progress}>
          <ProgressBar progress={progress} />
        </View>
      </View>
    </Screen>
  );
};

export { ImageUploading };
