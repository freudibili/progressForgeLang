import { useRouter } from "expo-router";
import { YStack, Text, Button, H1 } from "tamagui";

export default function CardsScreen() {
  const router = useRouter();

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$4"
      gap="$4"
    >
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
