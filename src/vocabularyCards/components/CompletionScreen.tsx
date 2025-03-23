import { MyScreen } from '@common/components/MyScreen';
import { userSelectors } from '@user/store/userSelectors';
import { Href, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Button, Text, YStack } from 'tamagui';

export const CompletionScreen = () => {
  const masteredCount = userSelectors.useMasteredWordsCount();
  const router = useRouter();

  const handleGoHome = useCallback(() => {
    router.replace('/' as Href);
  }, [router]);

  return (
    <MyScreen title="Level Complete">
      <YStack
        flex={1}
        padding="$4"
        gap="$4"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="$8" textAlign="center" fontWeight="bold">
          Congratulations! 🎉
        </Text>
        <Text fontSize="$6" textAlign="center">
          You've completed all cards in this level
        </Text>
        <Text fontSize="$5" textAlign="center" color="$gray10">
          You've mastered {masteredCount} words
        </Text>
        <Button size="$5" theme="active" onPress={handleGoHome}>
          Back to Home
        </Button>
      </YStack>
    </MyScreen>
  );
};
