import { WebTabBar } from '@common/components/WebTabBar';
import { Home, Book, User, Settings } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { isWeb, TamaguiProvider } from 'tamagui';
import { config } from 'tamagui.config';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
    >
      {isWeb && <WebTabBar />}
      <Tabs
        screenOptions={{
          headerShown: !isWeb,
          tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          tabBarPosition: isWeb ? 'top' : 'bottom',
          tabBarStyle: isWeb ? { display: 'none' } : undefined
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
          }}
        />
        <Tabs.Screen
          name="vocabularyCards"
          options={{
            title: 'Vocabulary',
            tabBarLabel: 'Vocabulary',
            tabBarIcon: ({ color, size }) => <Book color={color} size={size} />
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Settings color={color} size={size} />
            )
          }}
        />
      </Tabs>
    </TamaguiProvider>
  );
}
