import React from 'react';
import { ScrollView } from 'tamagui';

import { LevelList } from './LevelList';

import { useLevelSelectionViewModel } from '../viewModels/LevelSelectionViewModel';
import { MyScreen } from '@/shared/components/MyScreen';

export function LevelSelectionScreen() {
  const { levelsByCategory, isLoading, error, handleLevelSelect } =
    useLevelSelectionViewModel();

  return (
    <MyScreen title="Welcome" error={error} loading={isLoading}>
      <ScrollView>
        <LevelList
          levelsByCategory={levelsByCategory}
          onLevelSelect={handleLevelSelect}
        />
      </ScrollView>
    </MyScreen>
  );
}
