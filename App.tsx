import { ExpoRoot } from 'expo-router';
import type { FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ExpoRoot context={require.context('./src/mobile/app')} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
