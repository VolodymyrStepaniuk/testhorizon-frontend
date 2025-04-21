import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";
import { dataDisplayCustomizations } from "./customization/dataDisplay";
import { inputsCustomizations } from "./customization/inputs";
import { navigationCustomizations } from "./customization/navigation";
import { surfacesCustomizations } from "./customization/surfaces";
import { dataGridCustomizations } from "./customization/dataGrid";

interface AppThemeProps {
  children: React.ReactNode;
  themeComponents?: ThemeOptions["components"];
}

export default function AppTheme(props: AppThemeProps) {
  const { children, themeComponents } = props;
  const theme = React.useMemo(() => {
    return createTheme({
      cssVariables: {
        colorSchemeSelector: "data-mui-color-scheme",
        cssVarPrefix: "template",
      },
      colorSchemes,
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
        ...dataGridCustomizations,
      },
    });
  }, [themeComponents]);
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
