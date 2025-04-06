import { Dialog, H3, H2, XStack, YStack, Text, H5 } from 'tamagui';

import React from 'react';
import { Button } from '@/shared/components/MyButton';
import { TrophyIcon } from '@/shared/components/TrophyIcon';

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
          <YStack gap="$4" padding="$4" justifyContent="center">
            <H2 textAlign="center" fontWeight="bold">
              Congratulations!
            </H2>
            <H3 textAlign="center">
              You've mastered <Text fontWeight="bold">{masteredCount}</Text>{' '}
              verbs!
            </H3>
            <XStack justifyContent="center">
              <TrophyIcon size={60} />
            </XStack>
            <XStack alignItems="center" justifyContent="center" gap="$2">
              <H5 textAlign="center">Keep up the great work!</H5>
            </XStack>
            <XStack justifyContent="center" paddingTop="$2">
              <Button onPress={onClose}>Continue Learning</Button>
            </XStack>
          </YStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
