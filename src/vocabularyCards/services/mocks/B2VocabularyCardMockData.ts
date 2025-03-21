import { VocabularyCard } from "../../types";

export const mockLevels: VocabularyCard[] = [
  {
    id: "1",
    infinitiv: {
      de: "widersprechen",
      fr: "contredire",
      en: "to contradict",
    },
    conjugation: {
      präsens: "widerspricht",
      präteritum: "widersprach",
      perfekt: "hat widersprochen",
      plusquamperfekt: "hatte widersprochen",
      futurI: "wird widersprechen",
    },
    level: "B2",
    type: "irregular",
    example: {
      de: "Er widerspricht seinem Chef.",
      fr: "Il contredit son chef.",
      en: "He contradicts his boss.",
    },
    difficulty: "advanced",
    mastered: false,
  },
];
