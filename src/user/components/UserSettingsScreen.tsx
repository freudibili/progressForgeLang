import { MyScreen } from "@common/components/MyScreen";
import React, { useEffect } from "react";

import { useUserStore } from "../store/userStore";

export const UserSettingsScreen: React.FC = () => {
  const { user, isLoading, error, fetchUser } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  return (
    <MyScreen title="Settings" error={error} loading={isLoading}>
      User settings content goes here
    </MyScreen>
  );
};
