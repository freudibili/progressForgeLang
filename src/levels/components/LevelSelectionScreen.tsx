import { navigateTo } from "@common/utils/navigation";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, YStack, Text, H1, Spinner } from "tamagui";

import { LevelCard } from "./LevelCard";
import { useLevelStore } from "../store/levelStore";
import { Level } from "../types/level";

export function LevelSelectionScreen(): JSX.Element {
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

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color="$red10">{error}</Text>
      </YStack>
    );
  }

  return (
    <ScrollView>
      <YStack padding="$4" space="$4">
        <H1>Choose Your Level</H1>
        <Text>Select a level to start practicing your vocabulary</Text>

        <YStack space="$3">
          {levels.map((level: Level) => (
            <LevelCard
              key={level.id}
              level={level}
              onSelect={handleLevelSelect}
            />
          ))}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
