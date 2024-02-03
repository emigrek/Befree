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
import { useAddictionCreatorStore, useNetInfoStore } from '@/store';
import { NameSchema, Name as NameType } from '@/validation/name.schema';

const NameAndImage = () => {
  const {
    name: storeName,
    setName,
    image,
    setImage,
  } = useAddictionCreatorStore(state => ({
    name: state.name,
    setName: state.setName,
    image: state.image,
    setImage: state.setImage,
  }));
  const { control, watch } = useForm<NameType>({
    mode: 'all',
    resolver: zodResolver(NameSchema),
    values: { name: storeName },
  });
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
        <View style={style.textsContainer}>
          <Bold variant="headlineSmall" style={style.texts}>
            {i18n.t(['screens', 'addictionCreator', 'nameAndImage', 'title'])}
          </Bold>
          <Subtitle variant="bodySmall" style={style.texts}>
            {i18n.t([
              'screens',
              'addictionCreator',
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
            value={storeName}
            placeholder={i18n.t([
              'screens',
              'addictionCreator',
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
