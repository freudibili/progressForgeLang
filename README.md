# Progress Forge Language Learning

A cross-platform language learning application for French to German vocabulary.

## Features

- Cross-platform mobile and web application
- Vocabulary card management
- User progress tracking
- Multiple language levels
- Settings customization
- Dashboard statistics

## Setup

```bash
# Install dependencies
npm install

# Start mobile app
npm start

# Start web app
npm run web
```

## Project Structure

```
src/
├── apps/              # Platform-specific code
│   ├── expo/          # Mobile app (React Native)
│   └── web/           # Web app (Next.js)
├── common/            # Shared utilities
├── shared/            # Shared components
└── features/          # Core features
    ├── vocabularyCards/
    ├── dashboard/
    ├── user/
    ├── settings/
    └── levels/
```

## Tech Stack

- React Native (Expo) & Next.js
- Tamagui UI framework
- Zustand state management with persist middleware
- AsyncStorage for local data storage
- Expo Router for mobile navigation
- Jest testing framework

## Testing

```bash
# Run tests
npm test
```

## CI/CD

GitHub Actions handles CI with automated testing and code quality checks.

## License

MIT
