import type { ConfigAPI } from "@babel/core";

interface BabelConfig {
  presets: (string | [string, Record<string, unknown>])[];
  plugins: (string | [string, Record<string, unknown>] | [string, unknown])[];
}

export default function (api: ConfigAPI): BabelConfig {
  api.cache.forever();
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        "transform-inline-environment-variables",
        {
          include: ["TAMAGUI_TARGET", "EXPO_ROUTER_APP_ROOT"],
        },
      ],
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          config: "./src/mobile/tamagui.config.ts",
          logTimings: true,
        },
      ],
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@levels": "./src/levels",
            "@common": "./src/common",
            "@auth": "./src/auth",
            "@user": "./src/user",
            "@vocabularyCard": "./src/vocabularyCard",
            "@mobile": "./src/mobile",
            "@web": "./src/web",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
}
