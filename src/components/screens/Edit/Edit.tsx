import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { FC, useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Loading } from '../Loading';

import { ImageUploading } from '@/components/screens/CreationWizard';
import { Addiction } from '@/components/ui/Addiction';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import i18n from '@/i18n';
import { EditScreenProps, ModalStackNavigationProp } from '@/navigation/types';
import { editAddiction } from '@/services/queries';
import { deleteImage, useImageUpload } from '@/services/storage';
import { useAuthStore } from '@/store';

interface EditProps {
  addiction: Addiction;
}

const Edit: FC<EditProps> = ({ addiction }) => {
  const user = useAuthStore(state => state.user);
  const { upload, imageUploadProgress, imageUploadStatus } = useImageUpload();
  const navigation = useNavigation<ModalStackNavigationProp>();

  const [name, setName] = useState<string>(addiction.name);
  const [image, setImage] = useState<string | null>(addiction.image);
  const [saving, setSaving] = useState<boolean>(false);

  const handleImageChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleSave = useCallback(async () => {
    if (!user) return;
    setSaving(true);

    const imageChanged = image !== addiction.image;
    const nameChanged = name !== addiction.name;

    if (!imageChanged && !nameChanged) {
      setSaving(false);
      navigation.navigate('Addiction', {
        id: addiction.id,
      });
      return;
    }

    const newImage =
      imageChanged && image
        ? await upload(`users/${user.uid}/addictions/${addiction.id}`, image)
        : null;

    if (!newImage && imageChanged) {
      await deleteImage({
        path: `users/${user.uid}/addictions/${addiction.id}`,
      });
    }

    const newAddiction = {
      name,
      image: newImage,
    };

    editAddiction({
      user,
      id: addiction.id,
      addiction: newAddiction,
    }).finally(() => {
      setSaving(false);
      navigation.goBack();
    });
  }, [user, addiction, name, image, upload, navigation]);

  if (imageUploadStatus || saving) {
    return (
      <ImageUploading
        label={i18n.t(['modals', 'edit', 'editing'])}
        progress={imageUploadProgress}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={style.screen}
    >
      <View style={style.innerContainer}>
        <Addiction.Image name={addiction.name} image={image} size={250} />
        <View style={style.buttonContainer}>
          <Button onPress={handleImageChange}>
            {i18n.t(['modals', 'edit', 'changeImage'])}
          </Button>
          {image && (
            <Button onPress={() => setImage(null)}>
              {i18n.t(['modals', 'edit', 'removeImage'])}
            </Button>
          )}
        </View>
        <TextInput
          label={i18n.t(['labels', 'name'])}
          style={style.input}
          value={name}
          onChangeText={handleNameChange}
        />
      </View>
      <Button
        mode={'contained'}
        contentStyle={{ height: 48, width: '100%' }}
        onPress={handleSave}
      >
        {i18n.t(['labels', 'save'])}
      </Button>
    </KeyboardAvoidingView>
  );
};

const EditScreen: React.FC<EditScreenProps> = ({ route }) => {
  const { id } = route.params;
  const addiction = useAddiction({ id });

  if (!addiction) {
    return <Loading />;
  }

  return <Edit addiction={addiction} />;
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    paddingHorizontal: 50,
    marginBottom: 100,
  },
  input: {
    width: '100%',
  },
  innerContainer: {
    width: '90%',
    alignItems: 'center',
    gap: 15,
  },
  buttonContainer: {
    gap: 5,
  },
});

export { EditScreen };
