import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';
import { selectLanguage } from '../store/settingsSelectors';

export const SettingsScreen: React.FC = () => {
  const language = useSettingsStore(selectLanguage);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Français', value: 'fr' },
    { label: 'Deutsch', value: 'de' },
    { label: 'Українська', value: 'uk' }
  ] as const;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.sectionTitle}>Language</Text>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.value}
          style={[
            styles.languageOption,
            language === lang.value && styles.selectedOption
          ]}
          onPress={() => setLanguage(lang.value)}
        >
          <Text
            style={[
              styles.languageText,
              language === lang.value && styles.selectedText
            ]}
          >
            {lang.label}
          </Text>
          {language === lang.value && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#666'
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5f5'
  },
  selectedOption: {
    backgroundColor: '#e3f2fd'
  },
  languageText: {
    fontSize: 16,
    color: '#333'
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#1976d2'
  },
  checkmark: {
    fontSize: 18,
    color: '#1976d2'
  }
});
