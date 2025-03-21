import { MyScreen } from "@common/components/MyScreen";
import { useLevelStore } from "@levels/store/levelStore";
import { userSelectors } from "../store/userSelectors";
import React from "react";
import { YStack, Text, XStack, H3 } from "tamagui";

export function UserProfileScreen() {
  const { selectedLevel } = useLevelStore();
  const masteredCount = userSelectors.useMasteredWordsCount();
  const dailyStreak = userSelectors.useDailyStreak();
  const successRate = userSelectors.useSuccessRate();
  const studyTime = userSelectors.useStudyTime();
  const preferences = userSelectors.usePreferences();

  return (
    <MyScreen title="Profile">
      <YStack flex={1} gap="$4">
        <YStack gap="$2">
          <H3>Current Level</H3>
          <Text>{selectedLevel?.name ?? "No level selected"}</Text>
        </YStack>

        <YStack gap="$2">
          <H3>Progress</H3>
          <XStack gap="$4" flexWrap="wrap">
            <YStack flex={1} minWidth={120}>
              <Text>Mastered Words</Text>
              <Text fontSize="$8">{masteredCount}</Text>
            </YStack>
            <YStack flex={1} minWidth={120}>
              <Text>Daily Streak</Text>
              <Text fontSize="$8">{dailyStreak} days</Text>
            </YStack>
            <YStack flex={1} minWidth={120}>
              <Text>Success Rate</Text>
              <Text fontSize="$8">{successRate.toFixed(1)}%</Text>
            </YStack>
            <YStack flex={1} minWidth={120}>
              <Text>Study Time</Text>
              <Text fontSize="$8">{Math.round(studyTime / 60)} hours</Text>
            </YStack>
          </XStack>
        </YStack>

        <YStack gap="$2">
          <H3>Settings</H3>
          <Text>Language: {preferences.language}</Text>
          <Text>Theme: {preferences.theme}</Text>
          <Text>
            Daily Reminder: {preferences.dailyReminder ? "On" : "Off"}
          </Text>
          <Text>Reminder Time: {preferences.reminderTime}</Text>
        </YStack>
      </YStack>
    </MyScreen>
  );
}
