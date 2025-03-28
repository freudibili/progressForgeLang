import React from 'react';
import { ScrollView } from 'tamagui';

import { LevelList } from './LevelList';
import { MyScreen } from '../../common/components/MyScreen';
import { useLevelSelectionViewModel } from '../viewModels/LevelSelectionViewModel';

export function LevelSelectionScreen() {
  const { levelsByCategory, isLoading, error, handleLevelSelect } =
    useLevelSelectionViewModel();

  return (
    <MyScreen title="Choose Your Level" error={error} loading={isLoading}>
      <ScrollView>
        <LevelList
          levelsByCategory={levelsByCategory}
          onLevelSelect={handleLevelSelect}
        />
      </ScrollView>
    </MyScreen>
  );
}
