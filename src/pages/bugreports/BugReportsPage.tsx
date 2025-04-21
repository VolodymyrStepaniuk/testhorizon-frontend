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
import BugReportCard from "../../components/bugreports/BugReportCard";
import { BugReportResponse } from "../../models/bugreport/BugReportResponse";
import { API } from "../../services/api.service";
import { AuthorityName } from "../../models/enum/authorityNames";
import { getAutoritiesFromToken } from "../../utils/auth.utils";
import { formatEnumWithLowerUnderline } from "../../utils/format.utils";
import { BugReportSeverity } from "../../models/enum/bugReportSeverities";
import { BugReportStatus } from "../../models/enum/bugReportStatuses";

const BugReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [bugReports, setBugReports] = useState<BugReportResponse[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [severity, setSeverity] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const bugsPerPage = 5;
  const authorities = getAutoritiesFromToken();
  const currentUserRole = authorities[0] as AuthorityName;

  useEffect(() => {
    const loadBugReports = async () => {
      setLoading(true);
      try {
        const response = await API.bugReports.getAll({
          page: page - 1,
          size: bugsPerPage,
          title: searchTerm || undefined,
          severityName: (severity as BugReportSeverity) || undefined,
          status: (status as BugReportStatus) || undefined,
        });

        setBugReports(response.data._embedded?.bugReports || []);
        setTotalItems(response.data.page.totalElements);
      } catch (error) {
        console.error("Failed to fetch bug reports:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBugReports();
  }, [page, searchTerm, severity, status]);

  const totalPages = Math.ceil(totalItems / bugsPerPage);

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

  const handleSeverityChange = (event: SelectChangeEvent<string>) => {
    setSeverity(event.target.value);
    setPage(1);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
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
        Bug Reports
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
            placeholder="Search bug reports by title..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FormControl sx={{ minWidth: 150 }} size="medium">
            <InputLabel id="severity-select-label">Severity</InputLabel>
            <Select
              labelId="severity-select-label"
              id="severity-select"
              value={severity}
              label="Severity"
              onChange={handleSeverityChange}
            >
              <MenuItem value="">All</MenuItem>
              {Object.values(BugReportSeverity).map((severityVal) => (
                <MenuItem key={severityVal} value={severityVal}>
                  {formatEnumWithLowerUnderline(severityVal)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }} size="medium">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="">All</MenuItem>
              {Object.values(BugReportStatus).map((statusVal) => (
                <MenuItem key={statusVal} value={statusVal}>
                  {formatEnumWithLowerUnderline(statusVal)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {currentUserRole !== AuthorityName.DEVELOPER && (
          <Button
            variant="contained"
            color="primary"
            href="/bug-reports/new"
            sx={{ ml: 2, whiteSpace: "nowrap" }}
          >
            Create New
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
        </Box>
      ) : (
        <>
          {bugReports.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="50vh"
            >
              <Typography variant="h6">No bug reports found</Typography>
            </Box>
          ) : (
            <Box>
              {bugReports.map((bugReport) => (
                <Box key={bugReport.id} sx={{ minWidth: 350 }}>
                  <BugReportCard {...bugReport} />
                </Box>
              ))}
            </Box>
          )}
          {bugReports.length > 0 && (
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

export default BugReportsPage;
