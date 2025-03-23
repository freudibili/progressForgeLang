import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createTamagui } from 'tamagui';

const interFont = createInterFont();

export const config = createTamagui({
  defaultTheme: 'light',
  fonts: {
    heading: interFont,
    body: interFont
  },
  themes,
  tokens,
  shorthands
});
