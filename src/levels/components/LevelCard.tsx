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
      backgroundColor="$gray5"
      borderRadius="$4"
      onPress={() => onSelect(level)}
      pressStyle={{ opacity: 0.7 }}
    >
      <YStack flex={1}>
        <Text fontSize="$5" fontWeight="600">
          {level.name}
        </Text>
        <Text fontSize="$3" color="$gray11">
          {level.description}
        </Text>
      </YStack>
    </XStack>
  );
}
