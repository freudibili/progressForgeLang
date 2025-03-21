import { VocabularyCard } from "../../types";

export const mockLevels: VocabularyCard[] = [
  {
    id: "11",
    infinitiv: {
      de: "anfangen",
      fr: "commencer",
      en: "to start",
    },
    conjugation: {
      präsens: "fängt an",
      präteritum: "fing an",
      perfekt: "hat angefangen",
      plusquamperfekt: "hatte angefangen",
      futurI: "wird anfangen",
    },
    level: "A2",
    type: "irregular",
    example: {
      de: "Der Kurs fängt um 9 Uhr an.",
      fr: "Le cours commence à 9 heures.",
      en: "The course starts at 9 o'clock.",
    },
    difficulty: "intermediate",
    mastered: false,
  },
  {
    id: "12",
    infinitiv: {
      de: "bekommen",
      fr: "recevoir",
      en: "to receive",
    },
    conjugation: {
      präsens: "bekommt",
      präteritum: "bekam",
      perfekt: "hat bekommen",
      plusquamperfekt: "hatte bekommen",
      futurI: "wird bekommen",
    },
    level: "A2",
    type: "irregular",
    example: {
      de: "Ich bekomme ein Geschenk.",
      fr: "Je reçois un cadeau.",
      en: "I receive a gift.",
    },
    difficulty: "intermediate",
    mastered: false,
  },
  {
    id: "13",
    infinitiv: {
      de: "besuchen",
      fr: "visiter",
      en: "to visit",
    },
    conjugation: {
      präsens: "besucht",
      präteritum: "besuchte",
      perfekt: "hat besucht",
      plusquamperfekt: "hatte besucht",
      futurI: "wird besuchen",
    },
    level: "A2",
    type: "regular",
    example: {
      de: "Wir besuchen unsere Freunde.",
      fr: "Nous visitons nos amis.",
      en: "We visit our friends.",
    },
    difficulty: "intermediate",
    mastered: false,
  },
  {
    id: "14",
    infinitiv: {
      de: "einladen",
      fr: "inviter",
      en: "to invite",
    },
    conjugation: {
      präsens: "lädt ein",
      präteritum: "lud ein",
      perfekt: "hat eingeladen",
      plusquamperfekt: "hatte eingeladen",
      futurI: "wird einladen",
    },
    level: "A2",
    type: "irregular",
    example: {
      de: "Er lädt mich zur Party ein.",
      fr: "Il m'invite à la fête.",
      en: "He invites me to the party.",
    },
    difficulty: "intermediate",
    mastered: false,
  },
  {
    id: "15",
    infinitiv: {
      de: "mitbringen",
      fr: "apporter",
      en: "to bring along",
    },
    conjugation: {
      präsens: "bringt mit",
      präteritum: "brachte mit",
      perfekt: "hat mitgebracht",
      plusquamperfekt: "hatte mitgebracht",
      futurI: "wird mitbringen",
    },
    level: "A2",
    type: "irregular",
    example: {
      de: "Sie bringt Kuchen mit.",
      fr: "Elle apporte un gâteau.",
      en: "She brings cake along.",
    },
    difficulty: "intermediate",
    mastered: false,
  },
];
