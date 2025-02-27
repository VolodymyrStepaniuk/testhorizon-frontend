import { Theme } from "@mui/material/styles";
import { axisClasses, legendClasses, chartsGridClasses } from "@mui/x-charts";
import type { ChartsComponents } from "@mui/x-charts/themeAugmentation";
import { gray } from "../themePrimitives";

export const chartsCustomizations: ChartsComponents<Theme> = {
  MuiChartsAxis: {
    styleOverrides: {
      root: () => ({
        [`& .${axisClasses.line}`]: {
          stroke: gray[700],
        },
        [`& .${axisClasses.tick}`]: { stroke: gray[700] },
        [`& .${axisClasses.tickLabel}`]: {
          fill: gray[300],
          fontWeight: 500,
        },
      }),
    },
  },
  MuiChartsTooltip: {
    styleOverrides: {
      mark: ({ theme }) => ({
        ry: 6,
        boxShadow: "none",
        border: `1px solid ${theme.palette.divider}`,
      }),
      table: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        background: gray[900],
      }),
    },
  },
  MuiChartsLegend: {
    styleOverrides: {
      root: {
        [`& .${legendClasses.mark}`]: {
          ry: 6,
        },
      },
    },
  },
  MuiChartsGrid: {
    styleOverrides: {
      root: () => ({
        [`& .${chartsGridClasses.line}`]: {
          stroke: gray[700],
          strokeDasharray: "4 2",
          strokeWidth: 0.8,
        },
      }),
    },
  },
};
