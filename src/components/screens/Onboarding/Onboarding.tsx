import { AuthorizationStatus } from '@notifee/react-native';
import { FC, useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { Dot } from './Dot';
import { Page } from './Page';
import { onboardingPages } from './onboardingPages';

import { Screen } from '@/components/ui/Screen';
import { useNotificationsSettings } from '@/hooks/notification';
import i18n from '@/i18n';
import { useAddictionsStore, useGlobalStore } from '@/store';

const { width } = Dimensions.get('window');

const OnboardingScreen: FC = () => {
  const setOnboarded = useGlobalStore(state => state.setOnboarded);
  const reloadNotifications = useAddictionsStore(
    state => state.reloadNotifications,
  );
  const scrollRef = useAnimatedRef<ScrollView>();
  const translateX = useSharedValue(0);
  const [onLastPage, setOnLastPage] = useState<boolean>(false);
  const { requestAuthorization } = useNotificationsSettings();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activePageIndex = useDerivedValue(() => {
    return Math.round(translateX.value / width);
  });

  const handleLastPage = (onLastPage: boolean) => {
    setOnLastPage(onLastPage);
  };

  useDerivedValue(() => {
    'worklet';
    runOnJS(handleLastPage)(
      activePageIndex.value + 1 === onboardingPages.length,
    );
  });

  const handleSkip = useCallback(async () => {
    if (activePageIndex.value === onboardingPages.length - 1) {
      setOnboarded(true);
      const response = await requestAuthorization();

      if (response?.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
        await reloadNotifications();
      }
      return;
    }

    scrollRef.current?.scrollTo({
      x: width * (onboardingPages.length - 1),
    });
  }, [
    scrollRef,
    activePageIndex.value,
    setOnboarded,
    requestAuthorization,
    reloadNotifications,
  ]);

  return (
    <Screen style={style.screen}>
      <Animated.ScrollView
        ref={scrollRef as any}
        style={style.scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        pagingEnabled
      >
        {onboardingPages.map((page, i) => (
          <Page key={i} {...page} />
        ))}
      </Animated.ScrollView>
      <View style={style.navigation}>
        <View style={style.pagination}>
          {onboardingPages.map((page, i) => (
            <Dot
              key={i}
              index={i}
              translateX={translateX}
              activeIndex={activePageIndex}
            />
          ))}
        </View>
        <Button onPress={handleSkip} mode={'contained-tonal'}>
          {onLastPage
            ? i18n.t(['screens', 'onboarding', 'getStarted'])
            : i18n.t(['screens', 'onboarding', 'skip'])}
        </Button>
      </View>
    </Screen>
  );
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  scrollView: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    gap: 6,
  },
  navigation: {
    height: 40,
    width,
    marginBottom: 50,
    paddingHorizontal: 60,
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
});

export { OnboardingScreen };
