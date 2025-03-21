import { MyScreen } from "@common/components/MyScreen";
import { useLevelStore } from "@levels/store/levelStore";
import React from "react";
import { YStack, Text, Button, XStack, H3 } from "tamagui";

export function ProfileScreen() {
  const { selectedLevel } = useLevelStore();

  return (
    <MyScreen title="Profile">
      <YStack flex={1} gap="$4">
        <YStack gap="$2">
          <H3>Current Level</H3>

          <Text>{selectedLevel?.name ?? "No level selected"}</Text>
        </YStack>

        <YStack gap="$2">
          <H3>Statistics</H3>
          <XStack gap="$4">
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

        <YStack gap="$2">
          <H3>Settings</H3>
          <Button>Change Language</Button>
          <Button>Notification Preferences</Button>
          <Button>Privacy Settings</Button>
        </YStack>
      </YStack>
    </MyScreen>
  );
}
