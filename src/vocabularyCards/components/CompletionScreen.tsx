import { MyScreen } from "@common/components/MyScreen";
import { userSelectors } from "@user/store/userSelectors";
import React from "react";
import { Button, Text, YStack } from "tamagui";

type CompletionScreenProps = {
  onGoHome: () => void;
};

export const CompletionScreen = ({ onGoHome }: CompletionScreenProps) => {
  const masteredCount = userSelectors.useMasteredWordsCount();

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
        <Button size="$5" theme="active" onPress={onGoHome}>
          Back to Home
        </Button>
      </YStack>
    </MyScreen>
  );
};
