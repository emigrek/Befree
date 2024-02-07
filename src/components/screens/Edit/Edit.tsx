import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import * as Network from 'expo-network';
import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { Loading } from '../Loading';

import { Addiction } from '@/components/ui/Addiction';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput';
import { ImagePicker } from '@/components/ui/ImagePicker';
import { KeyboardAvoidingView } from '@/components/ui/KeyboardAvoidingView';
import { UploadingDialog } from '@/components/ui/UploadingDialog';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import i18n from '@/i18n';
import { EditScreenProps, ModalStackNavigationProp } from '@/navigation/types';
import UserData from '@/services/data/userData';
import { addictionImageRef } from '@/services/refs/image';
import { useImageUpload } from '@/services/storage';
import { useAuthStore, useNetInfoStore } from '@/store';
import { NameSchema, Name as NameType } from '@/validation/name.schema';

interface EditProps {
  addiction: Addiction;
}

const Edit: FC<EditProps> = ({ addiction }) => {
  const user = useAuthStore(state => state.user);
  const { upload, task, uploadProgress } = useImageUpload();
  const navigation = useNavigation<ModalStackNavigationProp>();
  const netState = useNetInfoStore(state => state.netState);

  const { control, watch, handleSubmit } = useForm<NameType>({
    defaultValues: {
      name: addiction.name,
    },
    mode: 'all',
    resolver: zodResolver(NameSchema),
  });
  const name = watch('name');
  const [image, setImage] = useState<string | null>(addiction.image);
  const [saving, setSaving] = useState<boolean>(false);
  const disabled = saving || Boolean(task);

  const handleImageChange = useCallback(
    (image: string | null) => {
      setImage(image);
    },
    [setImage],
  );

  const onSubmit = useCallback(async () => {
    if (!user) return;

    const { addictions } = new UserData(user.uid);
    const imageChanged = image !== addiction.image;
    const nameChanged = name !== addiction.name;
    const { isInternetReachable } = await Network.getNetworkStateAsync();

    if (
      (!imageChanged && !nameChanged) ||
      (imageChanged && !nameChanged && !isInternetReachable)
    ) {
      navigation.pop();
      navigation.navigate('Addiction', {
        id: addiction.id,
      });
      return;
    }

    setSaving(true);

    const newImage =
      imageChanged && image
        ? await upload(`users/${user.uid}/addictions/${addiction.id}`, image)
        : null;

    if (!newImage && imageChanged && isInternetReachable) {
      try {
        await addictionImageRef(user.uid, addiction.id).delete();
      } catch (error) {
        console.log('Cant delete image: ', error);
      }
    }

    const newAddiction = {
      name,
      image: newImage,
    };

    await addictions.update(addiction.id, newAddiction);

    setSaving(false);
    navigation.pop();
    navigation.navigate('Addiction', {
      id: addiction.id,
    });
  }, [user, addiction, name, image, upload, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={disabled}
          loading={disabled}
          onPress={handleSubmit(onSubmit)}
        >
          {i18n.t(['labels', 'save'])}
        </Button>
      ),
    });
  }, [navigation, handleSubmit, onSubmit, disabled]);

  return (
    <KeyboardAvoidingView scrollViewContentStyle={style.screen}>
      <Card>
        <Card.Content style={style.imageCardContent}>
          <Addiction.Image name={name || ''} image={image} size={250} />
          <ImagePicker
            image={image}
            onImageChange={handleImageChange}
            style={style.imagePicker}
          >
            <ImagePicker.Pick disabled={!netState?.isConnected || disabled}>
              {i18n.t(['labels', 'pickImage'])}
            </ImagePicker.Pick>
            <ImagePicker.Remove disabled={!netState?.isConnected || disabled}>
              {i18n.t(['labels', 'removeImage'])}
            </ImagePicker.Remove>
          </ImagePicker>
        </Card.Content>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Card.Content>
          <ControlledTextInput
            control={control}
            name="name"
            disabled={disabled}
            label={i18n.t(['labels', 'name'])}
          />
        </Card.Content>
      </Card>
      <UploadingDialog visible={Boolean(task)} progress={uploadProgress} />
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
    paddingHorizontal: 15,
  },
  imageCardContent: { gap: 5, justifyContent: 'center', alignItems: 'center' },
  imagePicker: {
    marginTop: 10,
    gap: 5,
    justifyContent: 'center',
  },
});

export { EditScreen };
