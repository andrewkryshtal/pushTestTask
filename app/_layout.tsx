import { QueryClient, QueryClientProvider } from "react-query";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { ThemeProvider } from "styled-components/native";
import { themeObject } from "@/constants/themeObject";
import { useEffect } from "react";
import { secureStorageGetItem } from "@/storage/securedStorage";
import { queryClient } from "@/api/http";
import { checkToken } from "@/helpers/checkToken";
import { ERoutes, userDataKey } from "@/constants/constantsVariables";

export default function RootLayout() {
  useEffect(() => {
    (async () => {
      const tokens = await secureStorageGetItem(userDataKey);
      if (tokens) {
        console.log("tokens", tokens);
        router.push(ERoutes.PROFILE);
      } else {
        router.push(ERoutes.HOME);
      }
    })();

    // not a best aproach, but since we dont have any request with token - its hard to come up with token check functionality. commented realization in interceptors
    const interval = setInterval(async () => {
      console.log("tick");
      checkToken();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval); // Очищаем таймер
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
