import React from "react";
import { YStack, Text, Button, H1 } from "tamagui";
import { useRouter } from "expo-router";

export default function HomeScreen(): JSX.Element {
  const router = useRouter();

  return (
    <YStack gap="$6" padding="$4">
      <H1>Welcome to ProgressForgeLang</H1>

      <YStack gap="$4">
        <Text fontSize="$5">
          Practice your French to German vocabulary with our interactive cards.
        </Text>
        <YStack gap="$4">
          <Button size="$5" onPress={() => {}}>
            Practice Cards
          </Button>

          <Button
            size="$5"
            onPress={() => {
              router.replace("./cards");
            }}
          >
            Practice on Web
          </Button>
        </YStack>
      </YStack>
    </YStack>
  );
}
