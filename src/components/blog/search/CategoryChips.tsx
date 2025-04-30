import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { PostCategoryName } from "../../../models/enum/postCategoryName";
import { translateEnum } from "../../../utils/i18n.utils";
import { useTranslation } from "react-i18next";

interface CategoryChipsProps {
  selectedCategory: PostCategoryName | null;
  onCategoryChange: (category: PostCategoryName | null) => void;
  categories?: (PostCategoryName | null)[];
  sx?: React.CSSProperties;
}

const ChipsContainer = styled(Box)({
  display: "inline-flex",
  flexDirection: "row",
  gap: 10,
  overflow: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

export default function CategoryChips({
  selectedCategory,
  onCategoryChange,
  categories,
  sx = {},
}: CategoryChipsProps) {
  const { t } = useTranslation();
  const categoryOptions = categories || [
    null,
    ...Object.values(PostCategoryName),
  ];

  return (
    <ChipsContainer sx={sx}>
      {categoryOptions.map((category, index) => {
        let displayName = null;

        displayName =
          category !== null
            ? translateEnum("enums.post.category", category)
            : t("blog.categories.all");

        return (
          <Chip
            key={index}
            onClick={() => onCategoryChange(category)}
            size="medium"
            label={displayName}
            sx={{
              backgroundColor:
                (category === null && selectedCategory === null) ||
                selectedCategory === category
                  ? undefined
                  : "transparent",
              border:
                (category === null && selectedCategory === null) ||
                selectedCategory === category
                  ? undefined
                  : "none",
            }}
          />
        );
      })}
    </ChipsContainer>
  );
}
