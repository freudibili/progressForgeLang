import { WebTabBar } from "@common/components/WebTabBar";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { isWeb, TamaguiProvider } from "tamagui";
import { config } from "tamagui.config";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === "dark" ? "dark" : "light"}
    >
      {isWeb && <WebTabBar />}
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
          tabBarPosition: isWeb ? "top" : "bottom",
          tabBarStyle: isWeb ? { display: "none" } : undefined,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="vocabularyCards"
          options={{
            title: "Vocabulary",
            tabBarLabel: "Vocabulary",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarLabel: "Profile",
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
          }}
        />
      </Tabs>
    </TamaguiProvider>
  );
}
