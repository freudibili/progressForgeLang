import React from "react";
import { Button, Text, YStack } from "tamagui";

import { Level } from "../types/level";

interface LevelCardProps {
  level: Level;
  onSelect: (level: Level) => void;
}

export function LevelCard({ level, onSelect }: LevelCardProps): JSX.Element {
  return (
    <Button size="$5" theme="active" onPress={() => onSelect(level)}>
      <YStack space="$1" alignItems="flex-start">
        <Text fontSize="$6" fontWeight="bold">
          {level.name}
        </Text>
        <Text fontSize="$4" opacity={0.7}>
          {level.description}
        </Text>
      </YStack>
    </Button>
  );
}
