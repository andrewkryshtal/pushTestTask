import { QueryClientProvider } from "react-query";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { ThemeProvider } from "styled-components/native";
import { themeObject } from "@/constants/themeObject";
import { useEffect, useRef, useState } from "react";
import { secureStorageGetItem } from "@/storage/securedStorage";
import { queryClient } from "@/api/http";
import { checkToken } from "@/helpers/checkToken";
import { ERoutes, userDataKey } from "@/constants/constantsVariables";
import { AppState } from "react-native";

export default function RootLayout() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    (async () => {
      const tokens = await secureStorageGetItem(userDataKey);
      if (tokens) {
        router.push(ERoutes.PROFILE);
      } else {
        router.push(ERoutes.HOME);
      }
    })();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        checkToken();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeObject}>
        <Stack>
          <Stack.Screen
            options={{
              // Hide the header for this route
              headerShown: false,
            }}
            name="index"
          />
          <Stack.Screen
            options={{
              // Hide the header for this route
              headerShown: false,
            }}
            name="login"
          />
          <Stack.Screen
            options={{
              // Hide the header for this route
              headerShown: false,
            }}
            name="profile"
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
