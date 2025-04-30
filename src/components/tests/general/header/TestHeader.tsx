import React, { useState } from "react";
import { Typography, Box, Button, Paper, Grid } from "@mui/material";
import { TestResponse } from "../../../../models/test/TestResponse";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DeleteTestDialog from "./DeleteTestDialog";
import UpdateTestDialog from "./UpdateTestDialog";
import ProjectSettingsMenu from "../../../universal/menu/SettingsMenu";
import { TestTypeChip } from "../../../../theme/customization/chips";
import { ExportEntityType } from "../../../../models/enum/exportEntityTypes";
import RatingButton from "../../../universal/rating/RatingButton";
import { useTranslation } from "react-i18next";
import ExportButton from "../../../universal/file/ExportButton";

interface TestHeaderProps {
  test: TestResponse;
  setTest: React.Dispatch<React.SetStateAction<TestResponse | null>>;
  isAdmin: boolean;
  isAuthor: boolean;
  currentUserId: number;
}

const TestHeader: React.FC<TestHeaderProps> = ({
  test,
  setTest,
  isAdmin,
  isAuthor,
  currentUserId,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState<TestResponse>(test);
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const handleTestUpdated = (updatedTest: TestResponse) => {
    setCurrentTest(updatedTest);
    setTest(updatedTest);
  };

  const isProjectOwner = test.project && test.project.ownerId === currentUserId;

  // User can rate if they're an admin or the project owner
  const canRateUser =
    (isAdmin || isProjectOwner) &&
    test.author &&
    test.author.id !== currentUserId; // Can't rate yourself

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        variant="text"
        sx={{ mb: 2 }}
      >
        {t("tests.header.back")}
      </Button>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom>
            {currentTest.title}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
            <TestTypeChip testtype={currentTest.type} />
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
            entityType={ExportEntityType.TEST}
            entityId={currentTest.id}
          />

          {canRateUser && (
            <RatingButton
              userId={currentTest.author.id}
              entityType="Test"
              entityTitle={currentTest.title}
            />
          )}

          {canModify && (
            <>
              <Button
                variant="outlined"
                startIcon={<Settings />}
                onClick={handleSettingsClick}
              >
                {t("tests.header.settings")}
              </Button>
              <ProjectSettingsMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              <DeleteTestDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                testId={currentTest.id}
              />

              <UpdateTestDialog
                open={updateDialogOpen}
                onClose={() => setUpdateDialogOpen(false)}
                test={currentTest}
                onTestUpdated={handleTestUpdated}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TestHeader;
