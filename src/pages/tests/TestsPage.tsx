import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import TestCard from "../../components/tests/TestCard";
import { TestResponse } from "../../models/test/TestResponse";
import { API } from "../../services/api.service";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import { formatEnumWithLowerUnderline } from "../../utils/format.utils";
import { TestType } from "../../models/enum/testTypes";
import { useTranslation } from "react-i18next";

const TestsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tests, setTests] = useState<TestResponse[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [type, setType] = useState<string>("");
  const testsPerPage = 5;
  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;

  useEffect(() => {
    const loadTests = async () => {
      setLoading(true);
      try {
        const response = await API.tests.getAll({
          page: page - 1,
          size: testsPerPage,
          title: searchTerm || undefined,
          type: (type as TestType) || undefined,
        });

        setTests(response.data._embedded?.tests || []);
        setTotalItems(response.data.page.totalElements);
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, [page, searchTerm, type]);

  const totalPages = Math.ceil(totalItems / testsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
    setPage(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ mb: 6, fontWeight: "bold" }}
      >
        {t("testPages.list.title")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t("testPages.list.search")}
            value={searchTerm}
            onChange={handleSearch}
          />
          <FormControl sx={{ minWidth: 200 }} size="medium">
            <InputLabel id="type-select-label">
              {t("testPages.list.testType")}
            </InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={type}
              label={t("testPages.list.testType")}
              onChange={handleTypeChange}
            >
              <MenuItem value="">{t("testPages.list.all")}</MenuItem>
              {Object.values(TestType).map((typeVal) => (
                <MenuItem key={typeVal} value={typeVal}>
                  {formatEnumWithLowerUnderline(typeVal)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {currentUserRole !== AuthorityName.MENTOR && (
          <Button
            variant="contained"
            color="primary"
            href="/tests/new"
            sx={{ ml: 2, whiteSpace: "nowrap" }}
          >
            {t("testPages.list.createNew")}
          </Button>
        )}
      </Box>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            {t("testPages.list.loading")}
          </Typography>
        </Box>
      ) : (
        <>
          {tests.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="50vh"
            >
              <Typography variant="h6">
                {t("testPages.list.noTests")}
              </Typography>
            </Box>
          ) : (
            <Box>
              {tests.map((test) => (
                <Box key={test.id} sx={{ minWidth: 350 }}>
                  <TestCard {...test} />
                </Box>
              ))}
            </Box>
          )}
          {tests.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default TestsPage;
