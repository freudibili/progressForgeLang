import React from "react";
import { ScrollView } from "tamagui";
import { UserSettings } from "@user/components/UserSettings";

export default function SettingsScreen(): JSX.Element {
  return (
    <ScrollView>
      <UserSettings />
    </ScrollView>
  );
}
