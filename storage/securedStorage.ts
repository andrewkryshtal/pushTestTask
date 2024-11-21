import * as SecureStore from "expo-secure-store";

export const secureStorageSetItem = async (
  key: string,
  item: Record<string, unknown>
) => {
  const value = JSON.stringify(item);
  await SecureStore.setItemAsync(key, value);
};

export const secureStorageGetItem = async (key: string) => {
  const value = await SecureStore.getItemAsync(key);
  return value ? JSON.parse(value) : null;
};
