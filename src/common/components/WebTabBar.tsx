import { useRouter, usePathname, Href } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useColorScheme
} from 'react-native';
import { isWeb } from 'tamagui';

const tabs = [
  { name: 'Home', href: '/' },
  { name: 'Vocabulary', href: '/vocabularyCards' },
  { name: 'Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' }
];

export function WebTabBar() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();

  if (!isWeb) return null;

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => router.push(tab.href as Href)}
              style={[
                styles.tab,
                isActive && styles.activeTab,
                {
                  backgroundColor: isActive
                    ? colorScheme === 'dark'
                      ? '#333333'
                      : '#f3f4f6'
                    : 'transparent'
                }
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.activeTabText,
                  {
                    color: isActive
                      ? colorScheme === 'dark'
                        ? '#ffffff'
                        : '#000000'
                      : '#6b7280'
                  }
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Platform.select({
      web: '#ffffff',
      default: 'transparent'
    }),
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500'
  },
  activeTabText: {
    color: '#3b82f6'
  }
});
