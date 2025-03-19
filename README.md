# Progress Forge Language Learning App

A cross-platform language learning application for French to German vocabulary, built with React Native (Expo) and Next.js.

## Project Structure

```
progressForgeLang/
│
├── src/
│   ├── common/          # Shared utilities and components
│   ├── auth/           # Authentication module
│   ├── user/           # User management module
│   ├── card/           # Vocabulary card module
│   │   ├── services/   # API and business logic
│   │   ├── store/      # Zustand state management
│   │   ├── components/ # UI components
│   │   ├── types/      # TypeScript types
│   │   └── utils/      # Helper functions
│   ├── mobile/         # Mobile-specific code
│   │   └── screens/    # Expo Router screens
│   └── web/           # Web-specific code
│       └── pages/     # Next.js pages
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development servers:

For mobile:

```bash
npm start
```

For web:

```bash
npm run web
```

## Features

- Cross-platform support (iOS, Android, Web)
- TypeScript with strict type checking
- Modern UI with Tamagui
- State management with Zustand
- API integration with Axios
- Strict ESLint rules
- Path aliases for clean imports

## Development

- Mobile navigation: Expo Router
- Web navigation: Next.js
- Cross-navigation between platforms
- Modular architecture
- Type-safe development

## Commands

- `npm start` - Start Expo development server
- `npm run web` - Start Next.js development server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
