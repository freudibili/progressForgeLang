import { MyScreen } from '@common/components/MyScreen';
import React from 'react';

import { useUserStore } from '../store/userStore';
import { H3, Text } from 'tamagui';

export const UserSettingsScreen: React.FC = () => {
  const { user, preferences } = useUserStore();

  return (
    <MyScreen title="Settings">
      <H3>Languages</H3>
      <Text>{preferences.language}</Text>
    </MyScreen>
  );
};
