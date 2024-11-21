import {
  secureStorageGetItem,
  secureStorageSetItem,
} from "@/storage/securedStorage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { apiService, queryClient } from "@/api/http";
import { ERoutes, userDataKey } from "@/constants/constantsVariables";

export const checkToken = async () => {
  const { accessToken, refreshToken } = await secureStorageGetItem(userDataKey);

  const isTokenExpired = (token: string) => {
    var decoded = jwtDecode(token);

    if (
      decoded &&
      decoded.exp !== undefined &&
      decoded.exp < Date.now() / 1000
    ) {
      console.log("Access token expired");
      return true;
    } else {
      console.log("Access token not expired");
      return false;
    }
  };

  if (!accessToken || !refreshToken) {
    console.log("No token found");
    router.push(ERoutes.HOME);
    return;
  }

  if (isTokenExpired(accessToken) && isTokenExpired(refreshToken)) {
    console.log("Both tokens expired");
    router.push(ERoutes.HOME);
    return;
  }

  if (isTokenExpired(refreshToken)) {
    console.log("Refresh token expired");
    router.push(ERoutes.HOME);
    return;
  }

  if (isTokenExpired(accessToken)) {
    console.log("Access token expired");
    const response = await apiService.refresh(refreshToken);
    await secureStorageSetItem(userDataKey, {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });
    return;
  }
};
