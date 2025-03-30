import { router } from 'expo-router';
import React from 'react';
import { Text, YStack } from 'tamagui';

import { Button } from '@/common/components/MyButton';
import { MyScreen } from '@/common/components/MyScreen';

export const NoLevelSelectedScreen = () => {
  const goToHome = () => {
    router.back();
  };

  return (
    <MyScreen title="Vocabulary Cards">
      <YStack flex={1} justifyContent="center" alignItems="center" gap="$4">
        <Text>Please select a level to start practicing</Text>
        <Button onPress={goToHome}>Go to Home</Button>
      </YStack>
    </MyScreen>
  );
};
