import React from "react";
import { YStack, Text, Button, H2, XStack, ScrollView } from "tamagui";
import * as Linking from "expo-linking";

export default function ProfileScreen(): JSX.Element {
  const openWebProfile = (): void => {
    void Linking.openURL("http://localhost:3000/profile");
  };

  return (
    <ScrollView>
      <YStack padding="$4" gap="$4">
        <H2>Profile</H2>

        <YStack gap="$2">
          <Text fontSize="$6">Statistics</Text>
          <XStack gap="$4" flexWrap="wrap">
            <YStack
              backgroundColor="$gray5"
              padding="$3"
              borderRadius={4}
              flex={1}
              minWidth={150}
            >
              <Text fontSize="$8" fontWeight="bold">
                5
              </Text>
              <Text>Day Streak</Text>
            </YStack>
            <YStack
              backgroundColor="$gray5"
              padding="$3"
              borderRadius={4}
              flex={1}
              minWidth={150}
            >
              <Text fontSize="$8" fontWeight="bold">
                42
              </Text>
              <Text>Cards Mastered</Text>
            </YStack>
            <YStack
              backgroundColor="$gray5"
              padding="$3"
              borderRadius={4}
              flex={1}
              minWidth={150}
            >
              <Text fontSize="$8" fontWeight="bold">
                85%
              </Text>
              <Text>Success Rate</Text>
            </YStack>
          </XStack>
        </YStack>

        <YStack gap="$2">
          <Text fontSize="$6">Settings</Text>
          <Button size="$5">Notification Preferences</Button>
          <Button size="$5">Language Settings</Button>
          <Button size="$5">Privacy Settings</Button>
        </YStack>

        <Button size="$5" onPress={openWebProfile}>
          View Full Profile on Web
        </Button>
      </YStack>
    </ScrollView>
  );
}
