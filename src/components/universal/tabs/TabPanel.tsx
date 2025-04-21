import { Box } from "@mui/material";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  minHeight?: string | number;
}

const TabPanel = ({
  children,
  value,
  index,
  minHeight,
  ...other
}: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3, minHeight: minHeight || "auto" }}>{children}</Box>
      )}
    </div>
  );
};

export default TabPanel;
