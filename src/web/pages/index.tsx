import Link from "next/link";
import React from "react";
import { YStack, Text, Button, H1, Card } from "tamagui";

export default function HomePage(): JSX.Element {
  return (
    <YStack gap="$6" padding="$4">
      <H1>Welcome to ProgressForgeLang</H1>

      <Card elevate size="$4" bordered>
        <Card.Header padded>
          <YStack gap="$4">
            <Text fontSize="$5">
              Practice your French to German vocabulary with our interactive
              cards.
            </Text>

            <YStack gap="$4">
              <Link href="/cards">
                <Button size="$5">Practice Cards</Button>
              </Link>

              <Button
                size="$5"
                onPress={() => {
                  window.location.href = "progressforgelang://";
                }}
              >
                Open Mobile App
              </Button>
            </YStack>
          </YStack>
        </Card.Header>
      </Card>
    </YStack>
  );
}
