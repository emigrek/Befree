import { add, nextSaturday } from 'date-fns';
import { FC, useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { Timeline as TimelinePrimitive } from '@/components/ui/Timeline';
import { useSortedRelapses } from '@/hooks/addiction/useSortedRelapses';
import i18n from '@/i18n';
import { useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

interface TimelineProps {
  addiction: Addiction;
}

const Timeline: FC<TimelineProps> = ({ addiction }) => {
  const { colors } = useTheme();
  const { invert, setInvert, distinctPast, setDistinctPast } = useGlobalStore(
    state => ({
      invert: state.invert,
      setInvert: state.setInvert,
      distinctPast: state.distinctPast,
      setDistinctPast: state.setDistinctPast,
    }),
  );
  const sortedRelapses = useSortedRelapses({ addiction });
  const [settingsVisible, setSettingsVisible] = useState(false);
  const timelineRange: [Date, Date] = useMemo(() => {
    const start = sortedRelapses[0];

    const end = nextSaturday(
      add(new Date(), {
        weeks: 14,
      }),
    );

    return [start, end];
  }, [sortedRelapses]);

  const overlayStyle = useAnimatedStyle(() => {
    return {
      zIndex: 1,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    };
  }, [settingsVisible]);

  const reducer = (state: boolean) => (state ? 'checked' : 'unchecked');

  return (
    <Pressable
      onLongPress={() => setSettingsVisible(!settingsVisible)}
      style={style.container}
    >
      {settingsVisible && (
        <Animated.View style={[StyleSheet.absoluteFill, overlayStyle]}>
          <Checkbox.Item
            label={i18n.t([
              'modals',
              'addiction',
              'progress',
              'timeline',
              'invert',
            ])}
            status={reducer(invert)}
            onPress={() => setInvert(!invert)}
          />
          <Checkbox.Item
            label={i18n.t([
              'modals',
              'addiction',
              'progress',
              'timeline',
              'distinctPast',
            ])}
            status={reducer(distinctPast)}
            onPress={() => setDistinctPast(!distinctPast)}
          />
          <Button onPress={() => setSettingsVisible(false)}>
            {i18n.t(['labels', 'close'])}
          </Button>
        </Animated.View>
      )}
      <TimelinePrimitive
        key={Number(invert) + Number(distinctPast)}
        data={addiction.relapses}
        range={timelineRange}
        color={colors.primary}
        cellSize={22}
        fontSize={12}
        invert={invert}
        distinctPast={distinctPast}
      >
        <TimelinePrimitive.Days />
        <TimelinePrimitive.Body>
          <TimelinePrimitive.Weeks />
          <TimelinePrimitive.Cells />
        </TimelinePrimitive.Body>
      </TimelinePrimitive>
    </Pressable>
  );
};

export { Timeline };

const style = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: 10,
  },
});
