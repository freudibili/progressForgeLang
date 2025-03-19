import { YStack, Text, Button, H1 } from "tamagui";
import { useRouter } from "expo-router";

export default function CardsScreen() {
  const router = useRouter();

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space="$4">
      <H1>Vocabulary Cards</H1>
      <Text>Practice your vocabulary here</Text>
      <Button
        onPress={() => {
          router.back();
        }}
      >
        Go Back
      </Button>
    </YStack>
  );
}
