import { HeaderButton } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { THEME } from '../theme';

export const AppHeaderIcon = props => {
  return (
    <HeaderButton
      {...props}
      iconSize={24}
      IconComponent={Ionicons}
      color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
    />
  );
};
