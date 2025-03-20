import React, { useEffect } from "react";
import { YStack, Text } from "tamagui";

import { useUserStore } from "../store/userStore";

export const UserSettingsScreen: React.FC = () => {
  const { user, isLoading, error, fetchUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="$red10">{error}</Text>;
  }

  if (!user) {
    return <Text>No user data available</Text>;
  }

  return (
    <YStack gap="$4" padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        Settings
      </Text>
    </YStack>
  );
};
