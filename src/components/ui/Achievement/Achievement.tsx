import { StyleSheet, View, ViewProps } from 'react-native';

import { Body } from './Body';
import { Header } from './Header';
import { Icon } from './Icon';
import { NotificationIconButton } from './NotificationIconButton';
import { ProgressBar } from './ProgressBar';
import { Title } from './Title';

interface AchievementProps extends ViewProps {}

const ACHIEVEMENT_HEIGHT = 100;

function Achievement({ style: achievementStyle, ...props }: AchievementProps) {
  return <View style={[style.achievement, achievementStyle]} {...props} />;
}

Achievement.Icon = Icon;
Achievement.Body = Body;
Achievement.ProgressBar = ProgressBar;
Achievement.Title = Title;
Achievement.Header = Header;
Achievement.NotificationIconButton = NotificationIconButton;

export { ACHIEVEMENT_HEIGHT, Achievement };

const style = StyleSheet.create({
  achievement: {
    height: ACHIEVEMENT_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
