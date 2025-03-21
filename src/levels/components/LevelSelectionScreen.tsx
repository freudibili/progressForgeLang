import { navigateTo } from "@common/utils/navigation";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { YStack, Text, XStack } from "tamagui";

import { LevelCard } from "./LevelCard";
import { MyScreen } from "../../common/components/MyScreen";
import { useLevelStore } from "../store/levelStore";
import { Level } from "../types/level";

export function LevelSelectionScreen() {
  const router = useRouter();
  const { levels, isLoading, error, fetchLevels, selectLevel } =
    useLevelStore();

  useEffect(() => {
    fetchLevels();
  }, [fetchLevels]);

  const handleLevelSelect = (level: Level) => {
    selectLevel(level);
    navigateTo("cards", router);
  };

  return (
    <MyScreen title="Choose Your Level" error={error} loading={isLoading}>
      <YStack gap="$4">
        <Text>Select a level to start practicing your vocabulary</Text>

        <XStack flexWrap="wrap" justifyContent="space-between" gap="$4">
          {levels.map((level: Level) => (
            <LevelCard
              key={level.id}
              level={level}
              onSelect={handleLevelSelect}
            />
          ))}
        </XStack>
      </YStack>
    </MyScreen>
  );
}
