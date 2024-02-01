import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import style from './style';

import { Addiction } from '@/components/ui/Addiction';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput';
import { ImagePicker } from '@/components/ui/ImagePicker';
import { Bold, Subtitle } from '@/components/ui/Text';
import i18n from '@/i18n';
import { useCreationWizardStore, useNetInfoStore } from '@/store';
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
  const netState = useNetInfoStore(state => state.netState);
  const name = watch('name');

  const handleImageChange = useCallback(
    (image: string | null) => {
      setImage(image);
    },
    [setImage],
  );

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
          <ImagePicker
            image={image}
            onImageChange={handleImageChange}
            style={style.imagePicker}
          >
            <ImagePicker.Pick disabled={!netState?.isConnected}>
              {i18n.t(['labels', 'pickImage'])}
            </ImagePicker.Pick>
            <ImagePicker.Remove disabled={!netState?.isConnected}>
              {i18n.t(['labels', 'removeImage'])}
            </ImagePicker.Remove>
          </ImagePicker>
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
