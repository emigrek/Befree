import { useHeaderHeight } from '@react-navigation/elements';
import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

interface KeyboardAvoidingViewProps extends RNKeyboardAvoidingViewProps {
  scrollViewContentStyle?: StyleProp<ViewStyle>;
  verticalOffset?: number;
}

const KeyboardAvoidingView = ({
  style,
  children,
  verticalOffset,
  scrollViewContentStyle,
  ...props
}: KeyboardAvoidingViewProps) => {
  const headerHeight = useHeaderHeight();

  return (
    <RNKeyboardAvoidingView
      style={[styles.container, style]}
      behavior={BEHAVIOR}
      keyboardVerticalOffset={headerHeight + (verticalOffset || 0)}
      {...props}
    >
      <ScrollView
        style={scrollViewContentStyle}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </RNKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { KeyboardAvoidingView };
