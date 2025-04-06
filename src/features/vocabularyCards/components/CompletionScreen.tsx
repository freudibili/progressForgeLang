import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { Button } from 'tamagui';
import { useVocabularyCardStore } from '../store/vocabularyCardsStore';
import { AppRoutes } from '@/common/utils/routes';

export const CompletionScreen = () => {
  const router = useRouter();
  const { masteredCount } = useVocabularyCardStore((state) =>
    state.getTotalStats()
  );

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-4">Congratulations! 🎉</Text>
      <Text className="text-lg text-center mb-8">
        You have mastered {masteredCount} words in total!
      </Text>
      <Button
        size="$5"
        theme="active"
        onPress={() => router.replace({ pathname: AppRoutes.index })}
      >
        Back to Home
      </Button>
    </View>
  );
};
