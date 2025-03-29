import React from 'react';
import { XStack, YStack, Text } from 'tamagui';

import { Level } from '../types/levelTypes';

interface LevelCardProps {
  level: Level;
  onSelect: (level: Level) => void;
}

export function LevelCard({ level, onSelect }: LevelCardProps) {
  return (
    <XStack
      padding="$4"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$gray3"
      onPress={() => onSelect(level)}
      pressStyle={{ opacity: 0.7 }}
    >
      <YStack flex={1}>
        <Text fontWeight="600">{level.name}</Text>
        <Text color="$gray11">{level.description}</Text>
      </YStack>
    </XStack>
  );
}
