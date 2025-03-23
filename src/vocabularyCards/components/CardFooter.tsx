import React from 'react';
import { Button, XStack } from 'tamagui';

type CardFooterProps = {
  isRevealed: boolean;
  onCorrect: () => void;
  onIncorrect: () => void;
};

export const CardFooter = ({
  isRevealed,
  onCorrect,
  onIncorrect
}: CardFooterProps) => {
  if (!isRevealed) {
    return null;
  }

  return (
    <XStack gap="$4" justifyContent="center">
      <Button onPress={onIncorrect} backgroundColor="pink">
        I Didn't Know
      </Button>
      <Button onPress={onCorrect} backgroundColor="lightgreen">
        I Was Correct
      </Button>
    </XStack>
  );
};
