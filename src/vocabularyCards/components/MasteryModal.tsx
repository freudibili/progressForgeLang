import { Button, Dialog, Text, XStack, YStack } from 'tamagui';
import React from 'react';

type MasteryModalProps = {
  open: boolean;
  onClose: () => void;
  masteredCount: number;
};

export const MasteryModal = ({
  open,
  onClose,
  masteredCount
}: MasteryModalProps) => {
  return (
    <Dialog modal open={open}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true
              }
            }
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <YStack gap="$4" padding="$4">
            <Text fontSize="$8" textAlign="center" fontWeight="bold">
              🎉 Congratulations! 🎉
            </Text>
            <Text fontSize="$6" textAlign="center">
              You've mastered {masteredCount} verbs!
            </Text>
            <Text fontSize="$5" textAlign="center" color="$gray10">
              Keep up the great work!
            </Text>
            <XStack justifyContent="center" paddingTop="$2">
              <Button theme="active" size="$4" onPress={onClose}>
                Continue Learning
              </Button>
            </XStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
