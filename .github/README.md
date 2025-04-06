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

## CI/CD Workflow Details

This folder contains configuration files for continuous integration and continuous deployment (CI/CD) workflows.

### Workflow Files

- `workflows/ci.yml`: GitHub Actions workflow that runs tests and linting for pull requests and pushes to main and dev branches.

### Branch Protection

The repository has branch protection rules configured for both `main` and `dev` branches:

1. Require pull requests before merging
2. Require at least one approving review
3. Require status checks to pass (tests and linting)
4. Require branches to be up to date before merging
5. Apply these rules to repository administrators

### CI Workflow Details

The CI workflow runs on every pull request to `main` or `dev` branches and on every push to these branches. It performs the following steps:

1. Checks out the code
2. Sets up Node.js environment
3. Installs dependencies
4. Runs ESLint to check code quality
5. Runs tests to ensure functionality

## License

MIT
