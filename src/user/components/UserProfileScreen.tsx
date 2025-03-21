import { MyScreen } from "@common/components/MyScreen";
import { useUserStore } from "@user/store/userStore";
import { UserVocabProgress } from "@user/types";
import React from "react";
import { YStack, H3, Text, XStack } from "tamagui";

export function UserProfileScreen() {
  const { getMasteredWordsCount, getMasteredWords } = useUserStore();
  const masteredCount = getMasteredWordsCount();
  const masteredWords = getMasteredWords();
  return (
    <MyScreen title="Profile">
      <H3>Progress</H3>
      <XStack gap="$4">
        <YStack>
          <Text>Mastered Words</Text>
          <Text fontSize="$6">
            {masteredCount > 0 ? masteredCount + "⭐️" : 0}
          </Text>
        </YStack>
      </XStack>

      <MasteredWordsList masteredWords={masteredWords} />
    </MyScreen>
  );
}

// TODO: Move to a separate component
const MasteredWordsList = ({
  masteredWords,
}: {
  masteredWords: UserVocabProgress[];
}) => {
  return (
    <YStack>
      <H3>Mastered Words</H3>
      {masteredWords.map((word) => (
        <Text key={word.cardId}>{word.originalWord}</Text>
      ))}
    </YStack>
  );
};
