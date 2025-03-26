import {
  VocabularyCardState,
  useVocabularyCardStore
} from './vocabularyCardsStore';

export const vocabularyCardSelectors = {
  useVocabularyCards: () =>
    useVocabularyCardStore(
      (state: VocabularyCardState) => state.vocabularyCards
    ),
  useIsLoading: () =>
    useVocabularyCardStore((state: VocabularyCardState) => state.isLoading),
  useError: () =>
    useVocabularyCardStore((state: VocabularyCardState) => state.error)
};
