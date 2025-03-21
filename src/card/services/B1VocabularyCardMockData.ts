import { VocabularyCard } from "../types";

export const mockLevels: VocabularyCard[] = [
  {
    id: 1,
    infinitiv: {
      de: "erklären",
      fr: "expliquer",
      en: "to explain",
    },
    conjugation: {
      präsens: "erklärt",
      präteritum: "erklärte",
      perfekt: "hat erklärt",
      plusquamperfekt: "hatte erklärt",
      futurI: "wird erklären",
    },
    level: "B1",
    type: "regular",
    example: {
      de: "Er erklärt die Aufgabe.",
      fr: "Il explique la tâche.",
      en: "He explains the task.",
    },
    difficulty: "intermediate",
    mastered: false,
  },
  {
    id: 2,
    infinitiv: {
      de: "empfehlen",
      fr: "recommander",
      en: "to recommend",
    },
    conjugation: {
      präsens: "empfiehlt",
      präteritum: "empfahl",
      perfekt: "hat empfohlen",
      plusquamperfekt: "hatte empfohlen",
      futurI: "wird empfehlen",
    },
    level: "B1",
    type: "irregular",
    example: {
      de: "Ich empfehle dieses Buch.",
      fr: "Je recommande ce livre.",
      en: "I recommend this book.",
    },
    difficulty: "intermediate",
    mastered: false,
  },
];
