import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { BugReportSeverity } from "../../../../models/enum/bugReportSeverities";
import { BugReportStatus } from "../../../../models/enum/bugReportStatuses";
import { BugReportResponse } from "../../../../models/bugreport/BugReportResponse";
import {
  formatEnumWithLowerUnderline,
  formatEnumWithoutLowerUnderline,
} from "../../../../utils/format.utils";

// Styled chip for severity levels with different colors
const SeverityChip = styled(Chip)<{ severity: BugReportSeverity }>(
  ({ severity }) => ({
    backgroundColor:
      severity === BugReportSeverity.LOW
        ? "#4caf50"
        : severity === BugReportSeverity.MEDIUM
        ? "#ff9800"
        : severity === BugReportSeverity.HIGH
        ? "#f44336"
        : severity === BugReportSeverity.CRITICAL
        ? "#9c27b0"
        : "#9e9e9e",
    color: "#ffffff",
    fontWeight: "bold",
  })
);

// Styled chip for status levels with different colors
const StatusChip = styled(Chip)<{ status: BugReportStatus }>(({ status }) => ({
  backgroundColor:
    status === BugReportStatus.OPENED
      ? "#3f51b5"
      : status === BugReportStatus.IN_PROGRESS
      ? "#ff9800"
      : status === BugReportStatus.RESOLVED
      ? "#4caf50"
      : status === BugReportStatus.CLOSED
      ? "#9e9e9e"
      : "#607d8b",
  color: "#ffffff",
  fontWeight: "bold",
  marginLeft: "8px",
}));

const BugReportItem = ({ bugReport }: { bugReport: BugReportResponse }) => {
  const navigate = useNavigate();
  const reporterFullName = `${bugReport.reporter.firstName} ${
    bugReport.reporter.lastName || ""
  }`;

  const handleTitleClick = () => {
    navigate(`/bug-reports/${bugReport.id}`);
  };

  return (
    <Card variant="outlined" sx={{ my: 1 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            onClick={handleTitleClick}
            sx={{
              textDecoration: "none",
              color: "primary.main",
              cursor: "pointer",
            }}
          >
            {bugReport.title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <SeverityChip
              label={formatEnumWithoutLowerUnderline(bugReport.severity)}
              size="small"
              severity={bugReport.severity as BugReportSeverity}
            />
            <StatusChip
              label={formatEnumWithLowerUnderline(bugReport.status)}
              size="small"
              status={bugReport.status as BugReportStatus}
            />
          </Stack>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {bugReport.description || "No description provided."}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Avatar
            sx={{ width: 24, height: 24, mr: 1, fontSize: "0.8rem" }}
            alt={reporterFullName}
          >
            {bugReport.reporter.firstName.charAt(0)}
          </Avatar>
          <Typography variant="body2">{reporterFullName}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BugReportItem;
