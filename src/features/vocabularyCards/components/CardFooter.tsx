import React from 'react';
import { XStack } from 'tamagui';
import { X, Check } from '@tamagui/lucide-icons';
import { Button } from '@/common/components/MyButton';

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
      <Button
        variant="secondary"
        backgroundColor="$gray5"
        onPress={onIncorrect}
        icon={<X size="$1" />}
      >
        I Didn't Know
      </Button>
      <Button
        onPress={onCorrect}
        backgroundColor="$green10"
        icon={<Check size="$1" />}
      >
        I Was Correct
      </Button>
    </XStack>
  );
};
