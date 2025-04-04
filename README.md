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
│   │   ├── store/      # Zustand state management
│   │   │   ├── __tests__/  # Tests for store
│   │   │   └── __mocks__/  # Mock data for tests
│   ├── vocabularyCards/ # Vocabulary card module
│   │   ├── services/   # API and business logic
│   │   ├── store/      # Zustand state management
│   │   ├── components/ # UI components
│   │   ├── types/      # TypeScript types
│   │   └── utils/      # Helper functions
│   │       ├── __tests__/  # Tests for utilities
│   │       └── __mocks__/  # Mock data for tests
│   ├── expo/         # Mobile-specific code
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

## Testing

The project uses Jest for testing with the following structure:

- Tests are located in `__tests__` directories next to the code they test
- Mock data is stored in `__mocks__` directories
- Each module maintains its own mock data for tests

Run tests:

```bash
npm test                 # Run all tests
npm test -- --watch     # Run tests in watch mode
npm test -- --coverage  # Run tests with coverage report
```

### Test Organization

- Unit tests for store selectors
- Unit tests for utility functions
- Mock data separated by domain
- Consistent naming conventions for mocks

## Features

- Cross-platform support (iOS, Android, Web)
- TypeScript with strict type checking
- Modern UI with Tamagui
- State management with Zustand
- API integration with Axios
- Strict ESLint rules
- Path aliases for clean imports
- Comprehensive test coverage

## Development

- Mobile navigation: Expo Router
- Web navigation: Next.js
- Cross-navigation between platforms
- Modular architecture
- Type-safe development
- Test-driven development practices

## Commands

- `npm start` - Start Expo development server
- `npm run web` - Start Next.js development server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run Jest tests
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Best Practices

### Testing

- Keep mock data in separate files
- Use descriptive test names
- Group related tests using `describe` blocks
- Test edge cases and error conditions
- Maintain consistent mock data structure

### Code Organization

- Modular architecture
- Separate concerns
- Clear file naming
- Consistent directory structure
- Type safety throughout

## Contributing

1. Create a feature branch
2. Write tests for new features
3. Ensure all tests pass
4. Follow code style guidelines
5. Submit a pull request
