import { Components, Theme } from "@mui/material";

const customCompoents: Components<Omit<Theme, "components">> = {
  MuiCssBaseline: {
    styleOverrides: `
      *::-webkit-scrollbar {
        width: 6px !important;
        height: 6px !important;
      }
      *::-webkit-scrollbar-track {
        border-radius: 10px !important;
        background: rgba(0, 0, 0, 0.1) !important;
      }
      *::-webkit-scrollbar-thumb {
        border-radius: 10px !important;
        background: rgba(0, 0, 0, 0.2) !important;
      }
      *::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.4) !important;
      }
      *::-webkit-scrollbar-thumb:active {
        background: rgba(0, 0, 0, 0.7) !important;
      }
    `,
  },
};

export default customCompoents;
