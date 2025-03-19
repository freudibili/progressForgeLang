import { useRouter } from "expo-router";
import React from "react";
import { YStack, Text, Button, H1 } from "tamagui";

import { navigateToCards } from "../../utils/navigation";

export default function HomeScreen(): JSX.Element {
  const router = useRouter();

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      space="$4"
    >
      <H1>Welcome to Progress Forge</H1>
      <Text>Your language learning companion</Text>
      <Button onPress={() => navigateToCards(router)}>Practice Cards</Button>
    </YStack>
  );
}
