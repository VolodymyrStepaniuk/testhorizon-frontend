import React, { useState } from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExpandableCategoryProps<T> {
  title?: React.ReactNode;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  initialVisibleCount?: number;
  loadStep?: number;
}

const ExpandableCategory = <T extends { id: number }>({
  title,
  items,
  renderItem,
  initialVisibleCount = 5,
  loadStep = 5,
}: ExpandableCategoryProps<T>) => {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const handleLoadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibleCount((prev) => Math.min(prev + loadStep, items.length));
  };

  const showLoadMore = items.length > visibleCount;

  return (
    <Box sx={{ mb: 4 }}>
      {title && (
        <Box sx={{ mb: 1 }}>
          {typeof title === "string" ? (
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
          ) : (
            title
          )}
        </Box>
      )}

      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
        }}
      >
        <List disablePadding>
          {items.slice(0, visibleCount).map((item) => (
            <ListItem
              key={item.id}
              component="a"
              href="/"
              divider
              sx={{
                alignItems: "flex-start",
              }}
            >
              {renderItem(item)}
            </ListItem>
          ))}
        </List>
      </Paper>

      {showLoadMore && (
        <Box sx={{ textAlign: "center" }}>
          <IconButton
            onClick={handleLoadMore}
            sx={{
              border: "none",
              boxShadow: "none",
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "transparent" },
            }}
          >
            <ExpandMoreIcon fontSize="large" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ExpandableCategory;
