import { currentPlatform } from '@tamagui/core';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { YStack, Text, Spinner, ScrollView, View } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MyScreenProps {
  title?: string;
  error?: string | null;
  loading?: boolean;
  footer?: React.ReactNode;
  scrollable?: boolean;
  children: React.ReactNode;
}

export function MyScreen({
  title,
  error,
  loading,
  footer,
  scrollable,
  children
}: MyScreenProps) {
  const Container = scrollable ? ScrollView : YStack;
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={currentPlatform === 'ios' ? 'padding' : 'height'}
    >
      <Container
        style={{ flex: 1 }}
        paddingTop={insets.top}
        backgroundColor="white"
      >
        {title && (
          <YStack padding="$4" gap="$4">
            <Text fontSize="$7" fontWeight="bold" numberOfLines={1}>
              {title}
            </Text>
          </YStack>
        )}
        <YStack paddingHorizontal="$4" paddingTop="$4" gap="$4" flex={1}>
          {error && <Text color="$red10">{error}</Text>}
          {loading ? (
            <YStack flex={1} justifyContent="center" alignItems="center">
              <Spinner size="large" />
            </YStack>
          ) : (
            children
          )}
        </YStack>
        {footer && (
          <View
            paddingHorizontal="$4"
            paddingBottom={insets.bottom || '$4'}
            paddingTop="$4"
          >
            {footer}
          </View>
        )}
      </Container>
    </KeyboardAvoidingView>
  );
}
