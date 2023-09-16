import { FC, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Animated, {
  runOnJS,
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

const { width, height } = Dimensions.get('window');

const Onboarding: FC = () => {
  const setOnboarded = useGlobalStore(state => state.setOnboarded);
  const translateX = useSharedValue(0);
  const [buttonText, setButtonText] = useState<string>(
    i18n.t(['screens', 'onboarding', 'skip']),
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activePageIndex = useDerivedValue(() => {
    return Math.round(translateX.value / width);
  });

  const changeText = (seenAll: boolean) => {
    setButtonText(
      seenAll
        ? i18n.t(['screens', 'onboarding', 'getStarted'])
        : i18n.t(['screens', 'onboarding', 'skip']),
    );
  };

  useDerivedValue(() => {
    'worklet';
    runOnJS(changeText)(activePageIndex.value + 1 === onboardingPages.length);
  });

  const handleOnboarding = () => {
    setOnboarded(true);
  };

  return (
    <Screen style={style.screen}>
      <Animated.ScrollView
        style={style.scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        {onboardingPages.map((page, i) => (
          <Page key={i} {...page} />
        ))}
      </Animated.ScrollView>
      <View style={style.navigation}>
        <View style={style.pagination}>
          {onboardingPages.map((page, i) => (
            <Dot key={i} index={i} activeIndex={activePageIndex} />
          ))}
        </View>
        <Button onPress={handleOnboarding} mode={'contained'}>
          {buttonText}
        </Button>
      </View>
    </Screen>
  );
};

const Dot = ({
  index,
  activeIndex,
}: {
  index: number;
  activeIndex: Animated.SharedValue<number>;
}) => {
  const { colors } = useTheme();
  const animatedDotStyle = useAnimatedStyle(() => {
    const active = index === activeIndex.value;
    return {
      backgroundColor: withTiming(active ? colors.primary : colors.border, {
        duration: 100,
      }),
    };
  });

  return <Animated.View style={[style.dot, animatedDotStyle]} />;
};

const Page: FC<OnboardingPage> = ({
  description,
  title,
  illustration: Illustration,
}) => {
  return (
    <Screen style={style.page}>
      <View style={style.illustrationContainer}>
        {Illustration && <Illustration />}
      </View>
      <View>
        <Bold style={style.title} variant="displayMedium">
          {title}
        </Bold>
        <Text style={style.description} variant={'bodyMedium'}>
          {description}
        </Text>
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
  page: {
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 100,
    width,
    height,
  },
  scrollView: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    gap: 3,
  },
  dot: {
    width: 15,
    aspectRatio: 1,
    borderRadius: 15,
  },
  navigation: {
    height: 40,
    width,
    marginBottom: 50,
    paddingHorizontal: 50,
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  illustrationContainer: {
    height: height / 2.8,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});

export { Onboarding };
