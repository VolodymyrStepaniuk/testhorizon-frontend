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
import TestCaseCard from "../../components/testcases/TestCaseCard";
import { TestCaseResponse } from "../../models/testcase/TestCaseResponse";
import { API } from "../../services/api.service";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import { TestCasePriority } from "../../models/enum/testCasePriorities";
import { useTranslation } from "react-i18next";
import { translateEnum } from "../../utils/i18n.utils";

const TestCasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [testCases, setTestCases] = useState<TestCaseResponse[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [priority, setPriority] = useState<string>("");
  const testCasesPerPage = 5;
  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;
  const { t } = useTranslation();

  useEffect(() => {
    const loadTestCases = async () => {
      setLoading(true);
      try {
        const response = await API.testCases.getAll({
          page: page - 1,
          size: testCasesPerPage,
          title: searchTerm || undefined,
          priority: (priority as TestCasePriority) || undefined,
        });

        setTestCases(response.data._embedded?.testCases || []);
        setTotalItems(response.data.page.totalElements);
      } catch (error) {
        console.error("Failed to fetch test cases:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestCases();
  }, [page, searchTerm, priority]);

  const totalPages = Math.ceil(totalItems / testCasesPerPage);

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

  const handlePriorityChange = (event: SelectChangeEvent<string>) => {
    setPriority(event.target.value);
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
        {t("testCasePages.list.title")}
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
            placeholder={t("testCasePages.list.search")}
            value={searchTerm}
            onChange={handleSearch}
          />
          <FormControl sx={{ minWidth: 200 }} size="medium">
            <InputLabel id="priority-select-label">
              {t("testCasePages.list.priority")}
            </InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              value={priority}
              label={t("testCasePages.list.priority")}
              onChange={handlePriorityChange}
            >
              <MenuItem value="">{t("testCasePages.list.all")}</MenuItem>
              {Object.values(TestCasePriority).map((priorityVal) => (
                <MenuItem key={priorityVal} value={priorityVal}>
                  {translateEnum("enums.testCase.priority", priorityVal)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {currentUserRole !== AuthorityName.MENTOR && (
          <Button
            variant="contained"
            color="primary"
            href="/test-cases/new"
            sx={{ ml: 2, whiteSpace: "nowrap" }}
          >
            {t("testCasePages.list.createNew")}
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
            {t("testCasePages.list.loading")}
          </Typography>
        </Box>
      ) : (
        <>
          {testCases.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="50vh"
            >
              <Typography variant="h6">
                {t("testCasePages.list.noTestCases")}
              </Typography>
            </Box>
          ) : (
            <Box>
              {testCases.map((testCase) => (
                <Box key={testCase.id} sx={{ minWidth: 350 }}>
                  <TestCaseCard {...testCase} />
                </Box>
              ))}
            </Box>
          )}
          {testCases.length > 0 && (
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

export default TestCasePage;
