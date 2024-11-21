import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncStorageSetItem = async (
  key: string,
  value: Record<string, unknown>
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error();
  }
};

export const asyncStorageGetItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    throw new Error();
  }
};
