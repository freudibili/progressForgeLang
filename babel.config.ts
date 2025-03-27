import type { ConfigAPI } from '@babel/core';

export default function babelConfig(api: ConfigAPI) {
  api.cache.forever();
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@apps': './src/apps',
            '@common': './src/common',
            '@levels': './src/levels',
            '@vocabularyCards': './src/vocabularyCards',
            '@user': './src/user',
            '@auth': './src/auth'
          }
        }
      ],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
          logTimings: true
        }
      ]
    ]
  };
}
