import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Image, View } from 'react-native';
import { HelperText, TextInput, TouchableRipple } from 'react-native-paper';

import style from './style';

import { Bold, Subtitle } from '@/components/ui/Text';
import i18n from '@/i18n';
import { useCreationWizardStore } from '@/store';
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

  const handleImageSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  };

  const handleTextChange = (text: string) => {
    setErrors(!text ? [...errors, 'name'] : errors.filter(e => e !== 'name'));
    setName(text);
  };

  return (
    <View style={style.screen}>
      <View style={style.container}>
        <View style={style.texts}>
          <Bold variant="displaySmall" style={style.texts}>
            {i18n.t(['screens', 'creationWizard', 'nameAndImage', 'title'])}
          </Bold>
          <Subtitle variant="bodyMedium" style={style.texts}>
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
    </View>
  );
};

export { NameAndImage };
