import { FC, useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Screen } from '@/components/ui/Screen';
import { Bold } from '@/components/ui/Text';
import { OnboardingPage, onboardingPages } from '@/config/onboardingPages';
import i18n from '@/i18n';
import { useGlobalStore } from '@/store';
import { useTheme } from '@/theme';

const { width } = Dimensions.get('window');

const Onboarding: FC = () => {
  const setOnboarded = useGlobalStore(state => state.setOnboarded);
  const scrollRef = useAnimatedRef<ScrollView>();
  const translateX = useSharedValue(0);
  const [onLastPage, setOnLastPage] = useState<boolean>(false);

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

  const handleSkip = useCallback(() => {
    if (activePageIndex.value === onboardingPages.length - 1) {
      setOnboarded(true);
      return;
    }
    scrollRef.current?.scrollTo({
      x: width * (onboardingPages.length - 1),
    });
  }, [scrollRef, activePageIndex.value, setOnboarded]);

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

const Dot = ({
  index,
  activeIndex,
  translateX,
}: {
  index: number;
  translateX: SharedValue<number>;
  activeIndex: SharedValue<number>;
}) => {
  const { colors } = useTheme();
  const animatedDotStyle = useAnimatedStyle(() => {
    const active = index === activeIndex.value;
    const widthAnimation = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [15, 20, 15],
      Extrapolate.CLAMP,
    );
    return {
      backgroundColor: withTiming(
        active ? colors.secondaryContainer : colors.border,
        {
          duration: 100,
        },
      ),
      width: widthAnimation,
    };
  });

  return <Animated.View style={[style.dot, animatedDotStyle]} />;
};

const Page: FC<OnboardingPage> = ({
  description,
  title,
  illustration: Illustration,
}) => {
  const { colors } = useTheme();
  return (
    <View style={style.page}>
      {Illustration && <Illustration />}
      <View>
        <Bold style={style.title} variant="displaySmall">
          {title}
        </Bold>
        <Text
          style={[style.description, { color: colors.outline }]}
          variant={'bodyMedium'}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  page: {
    paddingHorizontal: 60,
    width,
    justifyContent: 'space-evenly',
    paddingBottom: 60,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 9,
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
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});

export { Onboarding };
