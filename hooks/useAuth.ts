import { apiService } from "@/api/http";
import { router } from "expo-router";
import { useMutation } from "react-query";
import { asyncStorageSetItem } from "@/storage/asyncStorage";
import { secureStorageSetItem } from "@/storage/securedStorage";
import { ERoutes, userDataKey } from "@/constants/constantsVariables";

export const useLoginMutation = () =>
  useMutation<
    Record<string, unknown>,
    Error,
    { username: string; password: string }
  >({
    // @ts-ignore - this is a valid type, see line 10
    mutationFn: (data) => apiService.login(data),

    onSuccess: async (data) => {
      const {
        firstName,
        lastName,
        email,
        username,
        accessToken,
        refreshToken,
      } = data;

      console.log({ data });

      await asyncStorageSetItem(userDataKey, {
        firstName,
        lastName,
        email,
        username,
      });

      await secureStorageSetItem(userDataKey, { accessToken, refreshToken });
      router.push(ERoutes.PROFILE);
    },
  });

export const useRefreshMutation = () =>
  useMutation<Record<string, unknown>, Error, { refreshToken: string }>({
    // @ts-ignore - this is a valid type, see line 39
    mutationFn: (data) => apiService.refresh(data),
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data;
      await secureStorageSetItem(userDataKey, { accessToken, refreshToken });
    },
  });
