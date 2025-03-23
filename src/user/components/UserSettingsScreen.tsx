import { MyScreen } from '@common/components/MyScreen';
import React from 'react';

import { useUserStore } from '../store/userStore';

export const UserSettingsScreen: React.FC = () => {
  const { isLoading, error } = useUserStore();

  return (
    <MyScreen title="Settings" error={error} loading={isLoading}>
      User settings content goes here
    </MyScreen>
  );
};
