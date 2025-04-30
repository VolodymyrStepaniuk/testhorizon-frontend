import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { translateEnum } from "../../utils/i18n.utils";
import { PostCategoryName } from "../../models/enum/postCategoryName";

interface CategoryChipProps {
  categoryName: PostCategoryName;
  size?: "small" | "medium";
  sx?: any;
}

const StyledChip = styled(Chip)<{ category: PostCategoryName }>(
  ({ theme, category }) => {
    const getTagColor = () => {
      switch (category) {
        case PostCategoryName.QUALITY_ASSURANCE:
          return {
            bg: theme.palette.success.dark,
            color: theme.palette.success.contrastText,
          };
        case PostCategoryName.AUTOMATION_QA:
          return {
            bg: theme.palette.error.light,
            color: theme.palette.error.contrastText,
          };
        case PostCategoryName.MANUAL_TESTING:
          return {
            bg: theme.palette.info.light,
            color: theme.palette.info.contrastText,
          };
        case PostCategoryName.PERFORMANCE_TESTING:
          return {
            bg: theme.palette.warning.light,
            color: theme.palette.warning.contrastText,
          };
        case PostCategoryName.SECURITY_TESTING:
          return {
            bg: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
          };
        case PostCategoryName.TEST_MANAGEMENT:
          return {
            bg: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
          };
        default:
          return {
            bg: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
          };
      }
    };

    const { bg, color } = getTagColor();

    return {
      backgroundColor: bg,
      color: color,
      fontSize: "0.75rem",
      height: 24,
      fontWeight: 500,
      width: "fit-content", // This ensures the chip only takes as much width as needed
      maxWidth: "100%", // Prevents overflow
      "& .MuiChip-label": {
        padding: "0 8px",
      },
    };
  }
);

export default function CardCategoryChip({
  categoryName,
  size = "small",
  sx = {},
}: CategoryChipProps) {
  // Use the translation utility to get the localized name
  const displayName = translateEnum("enums.post.category", categoryName);

  return (
    <StyledChip
      label={displayName}
      category={categoryName}
      size={size}
      sx={{ ...sx }}
    />
  );
}
