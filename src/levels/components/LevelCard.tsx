import React from 'react';
import { Button, Text, YStack } from 'tamagui';

import { Level } from '../types/levelTypes';

interface LevelCardProps {
  level: Level;
  onSelect: (level: Level) => void;
}

export function LevelCard({ level, onSelect }: LevelCardProps) {
  return (
    <Button
      size="$5"
      theme="active"
      onPress={() => onSelect(level)}
      width="47%"
      height={160}
      padding="$4"
    >
      <YStack flex={1} justifyContent="center">
        <Text fontSize="$4" fontWeight="bold">
          {level.name}
        </Text>
        <Text fontSize="$3" opacity={0.7}>
          {level.description}
        </Text>
      </YStack>
    </Button>
  );
}
