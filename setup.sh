#!/bin/bash

# Create Expo app with router template
echo "Creating Expo app..."
npx create-expo-app@latest . -t with-router --npm

# Create Next.js app in web directory
echo "Creating Next.js app..."
mkdir -p src/web
cd src/web
npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"
cd ../..

# Install additional dependencies
echo "Installing dependencies..."
npm install zustand tamagui axios babel-plugin-module-resolver
npm install -D @types/react @types/react-native @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Create project structure
echo "Creating project structure..."
mkdir -p src/{common,auth,user,card/{services,store,components,types,utils},mobile/screens,web/pages}

# Copy configuration files
echo "Setting up configuration files..."
cp tsconfig.json tsconfig.json.bak
cp babel.config.js babel.config.js.bak
cp .eslintrc.js .eslintrc.js.bak

# Update tsconfig.json
cat > tsconfig.json << EOL
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@common/*": ["src/common/*"],
      "@auth/*": ["src/auth/*"],
      "@user/*": ["src/user/*"],
      "@card/*": ["src/card/*"],
      "@expo/*": ["src/expo/*"],
      "@web/*": ["src/web/*"]
    },
    "jsx": "react-native",
    "lib": ["ES2015", "DOM"]
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
EOL

# Update babel.config.js
cat > babel.config.js << EOL
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@common': './src/common',
            '@auth': './src/auth',
            '@user': './src/user',
            '@card': './src/card',
            '@mobile': './src/mobile',
            '@web': './src/web',
          },
        },
      ],
    ],
  };
};
EOL

# Update .eslintrc.js
cat > .eslintrc.js << EOL
module.exports = {
  extends: [
    'universe/native',
    'universe/shared/typescript-analysis',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
EOL

echo "Project setup complete!"
echo "To start development:"
echo "1. For mobile: npm start"
echo "2. For web: cd src/web && npm run dev" 