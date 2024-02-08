import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { Addiction } from '@/components/ui/Addiction';
import { ControlledTextInput } from '@/components/ui/ControlledTextInput';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import { ImagePicker } from '@/components/ui/ImagePicker';
import { KeyboardAvoidingView } from '@/components/ui/KeyboardAvoidingView/KeyboardAvoidingView';
import { UploadingDialog } from '@/components/ui/UploadingDialog';
import { useAddictionCreator } from '@/hooks/addiction/useAddictionCreator';
import i18n from '@/i18n';
import {
  AddictionCreatorScreenProps,
  ModalStackNavigationProp,
} from '@/navigation/types';
import { useNetInfoStore } from '@/store';
import { NameSchema, Name as NameType } from '@/validation/name.schema';

const AddictionCreator: FC<AddictionCreatorScreenProps> = ({ route }) => {
  const { name: paramsName, hide } = route.params;
  const navigation = useNavigation<ModalStackNavigationProp>();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { control, watch, handleSubmit } = useForm<NameType>({
    mode: 'all',
    resolver: zodResolver(NameSchema),
    values: { name: paramsName || '' },
  });
  const { create, creating, task, uploadProgress } = useAddictionCreator();
  const netState = useNetInfoStore(state => state.netState);
  const name = watch('name');
  const disabled = loading || creating || Boolean(task);

  const handleImageChange = useCallback(
    (image: string | null) => {
      setImage(image);
    },
    [setImage],
  );

  const onSubmit = useCallback(
    async ({ name }: { name: string }) => {
      setLoading(true);

      try {
        const addiction = await create({
          name,
          image,
          relapses: [],
          startedAt: startDate,
          hidden: hide,
        });

        setLoading(false);

        navigation.pop();

        if (!addiction) return;

        navigation.navigate('Addiction', {
          id: addiction.id,
        });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    [create, image, startDate, hide, navigation],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={disabled}
          loading={disabled}
          onPress={handleSubmit(onSubmit)}
        >
          {i18n.t(['labels', 'add'])}
        </Button>
      ),
    });
  }, [disabled, handleSubmit, navigation, onSubmit]);

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
        <Card.Content style={style.nameTimeDateCardContent}>
          <ControlledTextInput
            control={control}
            name="name"
            label={i18n.t(['labels', 'name'])}
            disabled={disabled}
          />
          <DateTimePicker
            style={style.dateTimePicker}
            date={startDate}
            setDate={setStartDate}
            dateValidRange={{
              endDate: new Date(),
            }}
            disabled={disabled}
          />
        </Card.Content>
      </Card>
      <UploadingDialog visible={Boolean(task)} progress={uploadProgress} />
    </KeyboardAvoidingView>
  );
};

export { AddictionCreator };

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
  },
  dateTimePicker: { width: '100%', gap: 7 },
  imagePicker: {
    marginTop: 10,
    gap: 5,
    justifyContent: 'center',
  },
  imageCardContent: { gap: 5, justifyContent: 'center', alignItems: 'center' },
  nameTimeDateCardContent: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
