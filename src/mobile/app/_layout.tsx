import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { config } from "../../../tamagui.config";
export default function RootLayout(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === "dark" ? "dark" : "light"}
    >
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
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
          name="cards"
          options={{
            title: "Vocabulary",
            tabBarLabel: "Cards",
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
