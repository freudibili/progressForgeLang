export const AppRoutes = {
  index: './',
  vocabularyCards: './vocabularyCards',
  profile: './profile',
  settings: './settings'
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];
