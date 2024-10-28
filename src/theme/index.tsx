"use client";

import { createTheme, ThemeOptions } from "@mui/material";
import { components, palette, typography } from "./section";

const theme: Omit<ThemeOptions, "components"> = createTheme({
  typography,
  palette,
  components,
});

export default theme;
