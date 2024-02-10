import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { ControlledTextInput } from '@/components/ui/ControlledTextInput';
import { DateTimePicker } from '@/components/ui/DateTimePicker';
import { KeyboardAvoidingView } from '@/components/ui/KeyboardAvoidingView/KeyboardAvoidingView';
import { useAddiction } from '@/hooks/addiction/useAddiction';
import {
  addAllNotifications,
  removeAllNotifications,
} from '@/hooks/goal/achievementsNotifications';
import i18n from '@/i18n';
import {
  ModalStackNavigationProp,
  RelapseCreatorScreenProps,
} from '@/navigation/types';
import RelapseManager from '@/services/data/managers/relapse';
import { useAuthStore, useGlobalStore } from '@/store';
import { NoteSchema, Note as NoteType } from '@/validation/note.schema';

const RelapseCreator: FC<RelapseCreatorScreenProps> = ({ route }) => {
  const { addictionId } = route.params;
  const addiction = useAddiction({ id: addictionId });
  const user = useAuthStore(state => state.user);
  const navigation = useNavigation<ModalStackNavigationProp>();

  const [relapseAtDate, setRelapseAtDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<NoteType>({
    mode: 'all',
    resolver: zodResolver(NoteSchema),
  });
  const { hasNotificationsBlacklisted } = useGlobalStore(state => ({
    hasNotificationsBlacklisted: state.isBlacklisted,
  }));

  const onSubmit = useCallback(
    async ({ note }: { note?: string }) => {
      if (!user || !addiction) return;
      const relapses = new RelapseManager(user.uid);

      setLoading(true);
      await relapses.create({
        addictionId,
        note: note || '',
        relapseAt: relapseAtDate,
      });
      setLoading(false);

      if (!hasNotificationsBlacklisted(addictionId)) {
        removeAllNotifications({ addictionId });
        addAllNotifications({ addiction });
      }

      navigation.pop();
    },
    [
      addictionId,
      relapseAtDate,
      user,
      navigation,
      addiction,
      hasNotificationsBlacklisted,
    ],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={loading}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        >
          {i18n.t(['labels', 'add'])}
        </Button>
      ),
    });
  }, [navigation, handleSubmit, onSubmit, loading]);

  return (
    <KeyboardAvoidingView scrollViewContentStyle={style.screen}>
      <Card>
        <Card.Content style={style.noteTimeCardContent}>
          <ControlledTextInput
            control={control}
            disabled={loading}
            multiline
            numberOfLines={6}
            name="note"
            style={{ minHeight: 100 }}
            label={i18n.t(['labels', 'note'])}
          />
          <DateTimePicker
            disabled={loading}
            style={style.dateTimePicker}
            date={relapseAtDate}
            setDate={setRelapseAtDate}
            dateValidRange={{
              startDate: addiction?.startedAt || new Date(),
              endDate: new Date(),
            }}
          />
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
};

export { RelapseCreator };

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
  },
  dateTimePicker: { width: '100%', gap: 7 },
  noteTimeCardContent: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
