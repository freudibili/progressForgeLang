import React from 'react';
import { Text, YStack, XStack, H3 } from 'tamagui';
import { useSettingsStore } from '../store/settingsStore';
import { selectedLanguage } from '../store/settingsSelectors';
import { LANGUAGES } from '../constants/languages';
import { MyScreen } from '@/common/components/MyScreen';

export const SettingsScreen: React.FC = () => {
  const language = useSettingsStore(selectedLanguage);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  return (
    <MyScreen>
      <YStack gap="$2">
        <H3>Language Settings</H3>
        <Text>
          Choose your preferred language for translations and examples
        </Text>
      </YStack>
      {LANGUAGES.map((lang) => (
        <XStack
          key={lang.value}
          onPress={() => setLanguage(lang.value)}
          padding="$3"
          pressStyle={{ opacity: 0.7 }}
          alignItems="center"
        >
          <YStack flex={1}>
            <Text
              fontSize="$5"
              color={language === lang.value ? '$blue11' : '$gray12'}
              fontWeight={language === lang.value ? 'bold' : 'normal'}
            >
              {lang.label}
            </Text>
            <Text
              fontSize="$4"
              color={language === lang.value ? '$blue11' : '$gray11'}
            >
              {lang.nativeName}
            </Text>
          </YStack>
          {language === lang.value && <Text color="$blue11">✓</Text>}
        </XStack>
      ))}
    </MyScreen>
  );
};
