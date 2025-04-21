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

interface OverviewTabProps {
  testCase: TestCaseResponse;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ testCase }) => {
  return (
    <>
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {testCase.description || "No description provided."}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Preconditions
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {testCase.preconditions || "No preconditions specified."}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Input Data
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {testCase.inputData || "No input data provided."}
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Test Steps
          </Typography>
          {testCase.steps && testCase.steps.length > 0 ? (
            <List>
              {testCase.steps.map((step, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`Step ${index + 1}`}
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
            <Typography variant="body1">No test steps provided.</Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewTab;
