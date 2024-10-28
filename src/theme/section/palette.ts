import { danger, info, primary, secondary, success, tertiary, warning } from "@/utils/const/color";
import { createTheme, PaletteColor, PaletteColorOptions, PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface CommonColors {
    grey: string;
  }
  interface Pallete {
    primaryButton?: PaletteColor;
    secondaryButton?: PaletteColor;
    tertiaryButton?: PaletteColor;
    successButton?: PaletteColor;
    errorButton?: PaletteColor;
    infoButton?: PaletteColor;
    warningButton?: PaletteColor;
    inheritButton?: PaletteColor;
    primaryIconButton?: PaletteColor;
    secondaryIconButton?: PaletteColor;
    tertiaryIconButton?: PaletteColor;
    successIconButton?: PaletteColor;
    errorIconButton?: PaletteColor;
    infoIconButton?: PaletteColor;
    warningIconButton?: PaletteColor;
    inheritIconButton?: PaletteColor;
  }
  interface PaletteOptions {
    primaryButton?: PaletteColorOptions;
    secondaryButton?: PaletteColorOptions;
    tertiaryButton?: PaletteColorOptions;
    successButton?: PaletteColorOptions;
    errorButton?: PaletteColorOptions;
    infoButton?: PaletteColorOptions;
    warningButton?: PaletteColorOptions;
    inheritButton?: PaletteColorOptions;
    primaryIconButton?: PaletteColorOptions;
    secondaryIconButton?: PaletteColorOptions;
    tertiaryIconButton?: PaletteColorOptions;
    successIconButton?: PaletteColorOptions;
    errorIconButton?: PaletteColorOptions;
    infoIconButton?: PaletteColorOptions;
    warningIconButton?: PaletteColorOptions;
    inheritIconButton?: PaletteColorOptions;
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

const customPalette: PaletteOptions = {
  common: {
    white: "#FFFFFF",
    black: "#000000",
    grey: "#EEEEEF",
  },

  primary: { main: primary[500] },
  error: { main: danger[500] },

  primaryButton: { ...createColor(primary[500]), contrastText: "#FFFFFF" },
  secondaryButton: { ...createColor(secondary[400]), contrastText: "#FFFFFF" },
  tertiaryButton: { ...createColor(tertiary[400]), contrastText: "#FFFFFF" },
  successButton: { ...createColor(success[400]), contrastText: "#FFFFFF" },
  errorButton: { ...createColor(danger[400]), contrastText: "#FFFFFF" },
  infoButton: { ...createColor(info[400]), contrastText: "#FFFFFF" },
  warningButton: { ...createColor(warning[400]), contrastText: "#FFFFFF" },
  inheritButton: { ...createColor("#898989"), contrastText: "#FFFFFF" },

  primaryIconButton: { ...createColor(primary[500]), contrastText: "#FFFFFF" },
  secondaryIconButton: { ...createColor(secondary[500]), contrastText: "#FFFFFF" },
  tertiaryIconButton: { ...createColor(tertiary[500]), contrastText: "#FFFFFF" },
  successIconButton: { ...createColor(success[500]), contrastText: "#FFFFFF" },
  errorIconButton: { ...createColor(danger[500]), contrastText: "#FFFFFF" },
  infoIconButton: { ...createColor(info[500]), contrastText: "#FFFFFF" },
  warningIconButton: { ...createColor(warning[500]), contrastText: "#FFFFFF" },
  inheritIconButton: { ...createColor("#898989"), contrastText: "#FFFFFF" },
};

export default customPalette;
