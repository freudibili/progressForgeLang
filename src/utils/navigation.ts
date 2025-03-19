import { Router } from "expo-router";
import { Platform } from "react-native";

import { getWebUrl } from "./getWebUrl";

export function navigateToCards(router: Router): void {
  if (Platform.OS === "web") {
    window.location.href = getWebUrl("/cards");
  } else {
    router.replace("./cards");
  }
}

export function navigateToWeb(): void {
  window.location.href = getWebUrl("/");
}
