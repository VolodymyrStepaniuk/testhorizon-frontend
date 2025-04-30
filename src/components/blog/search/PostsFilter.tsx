import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useTranslation } from "react-i18next";
import { usePosts } from "./PostsContext";
import { PostCategoryName } from "../../../models/enum/postCategoryName";
import CategoryChips from "./CategoryChips";

const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(4),
  overflow: "auto",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
    alignItems: "flex-start",
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1),
  width: "fit-content",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export function Search() {
  const { t } = useTranslation();
  const { searchTerm, setSearchTerm, setCurrentPage } = usePosts();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={t("blog.search")}
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        endAdornment={null} // Explicitly set to null to prevent any end adornment
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function PostsFilter() {
  const { t } = useTranslation();
  const { categories, selectedCategory, setSelectedCategory, setCurrentPage } =
    usePosts();

  const handleCategoryChange = (category: PostCategoryName | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const categoryOptions = [null, ...categories];

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("blog.postsTitle")}
        </Typography>
        <Typography color="text.secondary">
          {t("blog.postsSubtitle")}
        </Typography>
      </Box>

      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          gap: 1,
          width: "100%",
          mb: 2,
        }}
      >
        <Search />
      </Box>

      <FilterContainer>
        <CategoryChips
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categoryOptions}
        />

        <SearchContainer sx={{ display: { xs: "none", sm: "flex" } }}>
          <Search />
        </SearchContainer>
      </FilterContainer>
    </Box>
  );
}
