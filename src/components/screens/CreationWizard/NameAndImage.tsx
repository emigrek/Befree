import * as ImagePicker from 'expo-image-picker';
import React, { useCallback } from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import {
  HelperText,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';

import style from './style';

import { Bold, Subtitle } from '@/components/ui/Text';
import { useNetState } from '@/hooks/useNetState';
import i18n from '@/i18n';
import { useCreationWizardStore, useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

const NameAndImage = () => {
  const { colors } = useTheme();
  const { name, setName, image, setImage, setErrors, errors } =
    useCreationWizardStore(state => ({
      name: state.name,
      setName: state.setName,
      image: state.image,
      setImage: state.setImage,
      errors: state.errors,
      setErrors: state.setErrors,
    }));
  const setOfflineAcknowledged = useGlobalStore(
    state => state.setOfflineAcknowledged,
  );
  const net = useNetState();

  const handleImageSelect = useCallback(async () => {
    if (!net?.isConnected) return setOfflineAcknowledged(false);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  }, [net, setImage, setOfflineAcknowledged]);

  const handleTextChange = (text: string) => {
    setErrors(!text ? [...errors, 'name'] : errors.filter(e => e !== 'name'));
    setName(text);
  };

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
              {!net?.isConnected && (
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
          <TextInput
            value={name}
            onChangeText={handleTextChange}
            style={style.input}
            placeholder={i18n.t([
              'screens',
              'creationWizard',
              'nameAndImage',
              'placeholder',
            ])}
          />
          <HelperText type="error" visible={errors.includes('name')}>
            {i18n.t(['screens', 'creationWizard', 'nameAndImage', 'nameError'])}
          </HelperText>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export { NameAndImage };
