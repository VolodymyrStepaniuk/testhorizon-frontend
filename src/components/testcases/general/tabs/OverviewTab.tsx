import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { TestCaseResponse } from "../../../../models/testcase/TestCaseResponse";
import { useTranslation } from "react-i18next";

interface OverviewTabProps {
  testCase: TestCaseResponse;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ testCase }) => {
  const { t } = useTranslation();

  return (
    <>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t("testCases.tabs.description")}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {testCase.description || t("testCases.tabs.noDescription")}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t("testCases.tabs.preconditions")}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {testCase.preconditions || t("testCases.tabs.noPreconditions")}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t("testCases.tabs.inputData")}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {testCase.inputData || t("testCases.tabs.noInputData")}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t("testCases.tabs.testSteps")}
          </Typography>
          {testCase.steps && testCase.steps.length > 0 ? (
            <List>
              {testCase.steps.map((step, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`${t("testCases.tabs.step")} ${index + 1}`}
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: "inline", whiteSpace: "pre-line" }}
                        >
                          {step}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < testCase.steps.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body1">
              {t("testCases.tabs.noTestSteps")}
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewTab;
