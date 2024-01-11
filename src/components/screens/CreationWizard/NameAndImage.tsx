import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button } from 'react-native-paper';

import style from './style';

import { Addiction } from '@/components/ui/Addiction';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput';
import { Bold, Subtitle } from '@/components/ui/Text';
import i18n from '@/i18n';
import {
  useCreationWizardStore,
  useGlobalStore,
  useNetInfoStore,
} from '@/store';
import { NameSchema, Name as NameType } from '@/validation/name.schema';

const NameAndImage = () => {
  const { control, watch } = useForm<NameType>({
    mode: 'all',
    resolver: zodResolver(NameSchema),
  });
  const { setName, image, setImage } = useCreationWizardStore(state => ({
    setName: state.setName,
    image: state.image,
    setImage: state.setImage,
  }));
  const setOfflineAcknowledged = useGlobalStore(
    state => state.setOfflineAcknowledged,
  );
  const netState = useNetInfoStore(state => state.netState);
  const name = watch('name');

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

  const handleImageRemove = useCallback(() => {
    setImage(null);
  }, [setImage]);

  useEffect(() => {
    setName(name);
  }, [name, setName]);

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
          <Addiction.Image name={name || ''} image={image} size={250} full />
          <View style={style.buttonContainer}>
            <Button
              onPress={handleImageSelect}
              disabled={!netState?.isConnected}
            >
              {i18n.t(['modals', 'edit', 'changeImage'])}
            </Button>
            {image && (
              <Button
                onPress={handleImageRemove}
                disabled={!netState?.isConnected}
              >
                {i18n.t(['modals', 'edit', 'removeImage'])}
              </Button>
            )}
          </View>
          <ControlledTextInput
            control={control}
            name="name"
            label={i18n.t(['labels', 'name'])}
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
