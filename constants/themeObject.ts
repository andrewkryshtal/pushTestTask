import { DefaultTheme } from "react-native-paper";

export const themeObject = {
  colors: {
    text: "#000",
    background: "#fff",
    buttonTextColor: "#fff",
    activeOutlineColor: "#338BFF",
    error: "#FF3336",
  },
  mainFont: "NotoSans",
};

export const inputStylingTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: themeObject.colors.activeOutlineColor,
    error: themeObject.colors.error,
  },
  fonts: {
    config: {
      fontFamily: themeObject.mainFont,
    },
  },
};
