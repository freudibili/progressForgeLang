import React from 'react';
import { Button, Text, YStack } from 'tamagui';

import { Level } from '../types/level';

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
      minWidth="47%"
      flex={1}
      minHeight="160"
    >
      <YStack>
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
