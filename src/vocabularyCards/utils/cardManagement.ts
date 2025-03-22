import { UserVocabProgress } from "@user/types";
import type { VocabularyCard } from "../types";
import { getMasteredCount } from "./progressUtils";
import { selectWeightedRandomCard } from "./weightedSelection";

export const MASTERY_MILESTONE = 5;

export type CardSelectionState = {
  currentCard: VocabularyCard | null;
  previousCardId: string | null;
};

export type MilestoneState = {
  showModal: boolean;
  lastMilestone: number;
};

export const selectNextCard = (
  cards: VocabularyCard[],
  userProgress: UserVocabProgress[],
  previousCardId: string | null
): CardSelectionState => {
  const nextCard = selectWeightedRandomCard(
    cards,
    userProgress,
    previousCardId
  );
  return {
    currentCard: nextCard,
    previousCardId: nextCard?.id ?? null,
  };
};

export const checkMasteryMilestone = (
  cards: VocabularyCard[],
  userProgress: UserVocabProgress[],
  lastMilestone: number
): MilestoneState => {
  const masteredCount = getMasteredCount(cards, userProgress);
  const currentMilestone =
    Math.floor(masteredCount / MASTERY_MILESTONE) * MASTERY_MILESTONE;

  return {
    showModal: currentMilestone > lastMilestone,
    lastMilestone:
      currentMilestone > lastMilestone ? currentMilestone : lastMilestone,
  };
};

export const getCardStats = (
  cards: VocabularyCard[],
  userProgress: UserVocabProgress[]
) => {
  return {
    masteredCount: getMasteredCount(cards, userProgress),
    seenCount: userProgress.length,
  };
};
