import React, { useState } from "react";
import { Typography, Box, Button, Paper, Grid } from "@mui/material";
import { TestCaseResponse } from "../../../../models/testcase/TestCaseResponse";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProjectSettingsMenu from "../../../universal/menu/SettingsMenu";
import { TestCasePriorityChip } from "../../../../theme/customization/chips";
import DeleteTestCaseDialog from "./DeleteTestCaseDialog";
import UpdateTestCaseDialog from "./UpdateTestCaseDialog";
import ExportButton from "../../../universal/ExportButton";
import { ExportEntityType } from "../../../../models/enum/exportEntityTypes";
import RatingButton from "../../../universal/rating/RatingButton";

interface TestCaseHeaderProps {
  testCase: TestCaseResponse;
  setTestCase: React.Dispatch<React.SetStateAction<TestCaseResponse | null>>;
  isAdmin: boolean;
  isAuthor: boolean;
  currentUserId: number;
}

const TestCaseHeader: React.FC<TestCaseHeaderProps> = ({
  testCase,
  setTestCase,
  isAdmin,
  isAuthor,
  currentUserId,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [currentTestCase, setCurrentTestCase] =
    useState<TestCaseResponse>(testCase);
  const navigate = useNavigate();

  const canModify = isAdmin || isAuthor;
  const open = Boolean(anchorEl);

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setUpdateDialogOpen(true);
    handleCloseMenu();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handleTestCaseUpdated = (updatedTestCase: TestCaseResponse) => {
    setCurrentTestCase(updatedTestCase);
    setTestCase(updatedTestCase);
  };

  const isProjectOwner =
    testCase.project && testCase.project.ownerId === currentUserId;

  // User can rate if they're an admin or the project owner
  const canRateUser =
    (isAdmin || isProjectOwner) &&
    testCase.author &&
    testCase.author.id !== currentUserId; // Can't rate yourself

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        variant="text"
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {currentTestCase.title}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
            <TestCasePriorityChip priority={currentTestCase.priority} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            gap: 1,
          }}
        >
          <ExportButton
            entityType={ExportEntityType.TEST_CASE}
            entityId={currentTestCase.id}
          />

          {canRateUser && (
            <RatingButton
              userId={currentTestCase.author.id}
              entityType="Test Case"
              entityTitle={currentTestCase.title}
            />
          )}

          {canModify && (
            <>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                onClick={handleSettingsClick}
              >
                Settings
              </Button>
              <ProjectSettingsMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              <DeleteTestCaseDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                testCaseId={currentTestCase.id}
              />

              <UpdateTestCaseDialog
                open={updateDialogOpen}
                onClose={() => setUpdateDialogOpen(false)}
                testCase={currentTestCase}
                onTestCaseUpdated={handleTestCaseUpdated}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TestCaseHeader;
