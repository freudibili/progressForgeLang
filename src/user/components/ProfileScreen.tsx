import { useLevelStore } from "@levels/store/levelStore";
import React from "react";
import { YStack, Text, H1, Button, XStack } from "tamagui";

export function ProfileScreen(): JSX.Element {
  const { selectedLevel } = useLevelStore();

  return (
    <YStack flex={1} padding="$4" space="$4">
      <H1>Profile</H1>

      <YStack space="$4" flex={1}>
        <YStack space="$2">
          <Text fontSize="$6" fontWeight="bold">
            Current Level
          </Text>
          <Text>{selectedLevel?.name || "No level selected"}</Text>
        </YStack>

        <YStack space="$2">
          <Text fontSize="$6" fontWeight="bold">
            Statistics
          </Text>
          <XStack space="$4">
            <YStack>
              <Text>Cards Completed</Text>
              <Text fontSize="$8">0</Text>
            </YStack>
            <YStack>
              <Text>Correct Answers</Text>
              <Text fontSize="$8">0%</Text>
            </YStack>
          </XStack>
        </YStack>

        <YStack space="$2">
          <Text fontSize="$6" fontWeight="bold">
            Settings
          </Text>
          <Button>Change Language</Button>
          <Button>Notification Preferences</Button>
          <Button>Privacy Settings</Button>
        </YStack>
      </YStack>
    </YStack>
  );
}
