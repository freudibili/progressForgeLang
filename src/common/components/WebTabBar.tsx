import { useRouter, usePathname } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme
} from 'react-native';
import { isWeb } from 'tamagui';
import { AppRoutes } from '@common/utils/routes';

const tabs = [
  { name: 'Home', href: AppRoutes.index },
  { name: 'Vocabulary', href: AppRoutes.vocabularyCards },
  { name: 'Profile', href: AppRoutes.profile },
  { name: 'Settings', href: AppRoutes.settings }
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
              onPress={() => router.push(tab.href)}
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4
  },
  activeTab: {
    backgroundColor: '#f3f4f6'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280'
  },
  activeTabText: {
    color: '#000000'
  }
});
