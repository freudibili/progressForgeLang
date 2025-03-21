import { currentPlatform } from "@tamagui/core";
import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { YStack, Text, Spinner, ScrollView, View, H2 } from "tamagui";

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
  children,
}: MyScreenProps) {
  const Container = scrollable ? ScrollView : YStack;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={currentPlatform === "ios" ? "padding" : "height"}
    >
      <Container style={{ flex: 1 }}>
        {title && (
          <YStack padding="$4" gap="$4">
            <H2>{title}</H2>
          </YStack>
        )}
        <YStack padding="$4" gap="$4" flex={1}>
          {error && <Text color="$red10">{error}</Text>}
          {loading ? (
            <YStack flex={1} justifyContent="center" alignItems="center">
              <Spinner size="large" />
            </YStack>
          ) : (
            children
          )}
        </YStack>
        {footer && <View style={{ padding: 16 }}>{footer}</View>}
      </Container>
    </KeyboardAvoidingView>
  );
}
