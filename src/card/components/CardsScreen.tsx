import { navigateTo } from "@common/utils/navigation";
import { useLevelStore } from "@levels/store/levelStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { YStack, Text, Button, H1, Input } from "tamagui";

const exampleCards = [
  { question: "Bonjour", answer: "Hello" },
  { question: "Merci", answer: "Thank you" },
  { question: "Au revoir", answer: "Goodbye" },
];

export function CardsScreen(): JSX.Element {
  const router = useRouter();
  const { selectedLevel } = useLevelStore();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const currentCard = exampleCards[currentCardIndex];

  const handleCheckAnswer = (): void => {
    const correct =
      userAnswer.toLowerCase().trim() ===
      currentCard.answer.toLowerCase().trim();
    setIsCorrect(correct);
  };

  const handleNextCard = (): void => {
    setUserAnswer("");
    setIsCorrect(null);
    if (currentCardIndex < exampleCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      navigateTo("profile", router);
    }
  };

  return (
    <YStack flex={1} padding="$4" space="$4">
      <H1>Practice Cards</H1>
      <Text>Level: {selectedLevel?.name}</Text>

      <YStack space="$4" flex={1}>
        <Text fontSize="$8" textAlign="center">
          {currentCard.question}
        </Text>

        <Input
          value={userAnswer}
          onChangeText={setUserAnswer}
          placeholder="Enter your answer"
          size="$5"
        />

        {isCorrect === null ? (
          <Button onPress={handleCheckAnswer}>Check Answer</Button>
        ) : (
          <YStack space="$2">
            <Text color={isCorrect ? "$green10" : "$red10"}>
              {isCorrect
                ? "Correct!"
                : "Incorrect. The answer is: " + currentCard.answer}
            </Text>
            <Button onPress={handleNextCard}>
              {currentCardIndex === exampleCards.length - 1
                ? "Finish"
                : "Next Card"}
            </Button>
          </YStack>
        )}

        <Text textAlign="center">
          Card {currentCardIndex + 1} of {exampleCards.length}
        </Text>
      </YStack>
    </YStack>
  );
}
