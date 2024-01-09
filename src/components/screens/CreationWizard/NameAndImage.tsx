import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';

import style from './style';

import { ControlledTextInput } from '@/components/ui/ControlledTextInput';
import { Bold, Subtitle } from '@/components/ui/Text';
import i18n from '@/i18n';
import {
  useCreationWizardStore,
  useGlobalStore,
  useNetInfoStore,
} from '@/store';
import { useTheme } from '@/theme';
import {
  NameAndImageSchema,
  NameAndImage as NameAndImageType,
} from '@/validation/nameAndImage.schema';

const NameAndImage = () => {
  const { colors } = useTheme();
  const { control } = useForm<NameAndImageType>({
    mode: 'onTouched',
    resolver: zodResolver(NameAndImageSchema),
  });
  const { image, setImage } = useCreationWizardStore(state => ({
    name: state.name,
    setName: state.setName,
    image: state.image,
    setImage: state.setImage,
  }));
  const setOfflineAcknowledged = useGlobalStore(
    state => state.setOfflineAcknowledged,
  );
  const netState = useNetInfoStore(state => state.netState);

  const handleImageSelect = useCallback(async () => {
    if (!netState?.isConnected) return setOfflineAcknowledged(false);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  }, [netState, setImage, setOfflineAcknowledged]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={style.screen}
    >
      <View style={style.container}>
        <View style={style.texts}>
          <Bold variant="headlineSmall" style={style.texts}>
            {i18n.t(['screens', 'creationWizard', 'nameAndImage', 'title'])}
          </Bold>
          <Subtitle variant="bodySmall" style={style.texts}>
            {i18n.t([
              'screens',
              'creationWizard',
              'nameAndImage',
              'description',
            ])}
          </Subtitle>
        </View>
        <View style={style.details}>
          <TouchableRipple
            style={[
              style.imageContainer,
              { backgroundColor: colors.surfaceVariant },
            ]}
            onPress={handleImageSelect}
          >
            <>
              {!netState?.isConnected && (
                <Text variant="bodyLarge">
                  {i18n.t([
                    'screens',
                    'creationWizard',
                    'nameAndImage',
                    'connectionError',
                  ])}
                </Text>
              )}
              {image && <Image source={{ uri: image }} style={style.image} />}
            </>
          </TouchableRipple>
          <ControlledTextInput
            control={control}
            name="name"
            placeholder={i18n.t([
              'screens',
              'creationWizard',
              'nameAndImage',
              'placeholder',
            ])}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export { NameAndImage };
