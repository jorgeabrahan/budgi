import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

type Props = {
  children?: React.ReactNode;
};
export const WrapperTheme = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
