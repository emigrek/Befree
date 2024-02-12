import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { ControlledTextInput } from '@/components/ui/ControlledTextInput';
import { KeyboardAvoidingView } from '@/components/ui/KeyboardAvoidingView';
import { useRelapse } from '@/hooks/relapse';
import i18n from '@/i18n';
import {
  ModalStackNavigationProp,
  RelapseEditScreenProps,
} from '@/navigation/types';
import { RelapseManager } from '@/services/managers/firebase';
import { useAuthStore } from '@/store';
import { NoteSchema, Note as NoteType } from '@/validation/note.schema';

interface RelapseEditProps {
  relapse: Relapse;
}

const RelapseEdit: FC<RelapseEditProps> = ({ relapse }) => {
  const navigation = useNavigation<ModalStackNavigationProp>();
  const user = useAuthStore(state => state.user);
  const { control, handleSubmit } = useForm<NoteType>({
    defaultValues: {
      note: relapse.note,
    },
    mode: 'all',
    resolver: zodResolver(NoteSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async ({ note }: { note?: string }) => {
      if (!user) return;
      setLoading(true);
      const relapses = new RelapseManager(user.uid);
      await relapses.update(relapse.id, {
        note: note || '',
      });
      setLoading(false);
      navigation.pop();
    },
    [user, relapse.id, navigation],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          disabled={loading}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        >
          {i18n.t(['labels', 'save'])}
        </Button>
      ),
    });
  }, [navigation, loading, handleSubmit, onSubmit]);

  return (
    <KeyboardAvoidingView scrollViewContentStyle={style.screen}>
      <Card>
        <Card.Content>
          <ControlledTextInput
            control={control}
            disabled={loading}
            multiline
            numberOfLines={6}
            name="note"
            style={{ minHeight: 100 }}
            label={i18n.t(['labels', 'note'])}
          />
        </Card.Content>
      </Card>
    </KeyboardAvoidingView>
  );
};

const RelapseEditScreen: React.FC<RelapseEditScreenProps> = ({ route }) => {
  const { relapseId, addictionId } = route.params;
  const { relapse } = useRelapse({ addictionId, relapseId });

  if (!relapse) {
    return null;
  }

  return <RelapseEdit relapse={relapse} />;
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

export { RelapseEditScreen };
