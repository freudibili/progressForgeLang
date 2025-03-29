import { Check } from '@tamagui/lucide-icons';
import React from 'react';
import { Text, YStack, XStack, H3, Circle } from 'tamagui';

import { LANGUAGES } from '../constants/languages';
import { selectedLanguage } from '../store/settingsSelectors';
import { useSettingsStore } from '../store/settingsStore';

import { MyScreen } from '@/common/components/MyScreen';

export const SettingsScreen: React.FC = () => {
  const language = useSettingsStore(selectedLanguage);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  return (
    <MyScreen title="Settings">
      <YStack gap="$2">
        <H3>Language</H3>
      </YStack>
      {LANGUAGES.map((lang) => (
        <XStack
          key={lang.value}
          onPress={() => setLanguage(lang.value)}
          padding="$1"
          pressStyle={{ opacity: 0.7 }}
          alignItems="center"
        >
          <YStack flex={1}>
            <Text
              fontSize="$4"
              color={language === lang.value ? 'black' : '$gray11'}
              fontWeight={language === lang.value ? 'bold' : 'normal'}
            >
              {lang.label}
            </Text>
            <Text
              fontSize="$3"
              color={language === lang.value ? 'black' : '$gray11'}
            >
              {lang.nativeName}
            </Text>
          </YStack>
          {language === lang.value && (
            <Circle
              size={20}
              backgroundColor="black"
              alignItems="center"
              justifyContent="center"
            >
              <Check size={14} color="white" />
            </Circle>
          )}
        </XStack>
      ))}
    </MyScreen>
  );
};
