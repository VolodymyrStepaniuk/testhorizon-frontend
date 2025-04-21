import React from "react";
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaChevronDown } from "react-icons/fa";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
}));

const faqData = [
  {
    category: "Project Creation",
    questions: [
      {
        question: "How do I create a new testing project?",
        answer:
          "Developers can create a new project by clicking the 'Create Project' button on the dashboard. Provide a clear project title, detailed description, application URL, and necessary test credentials.",
      },
      {
        question: "What details are required for project creation?",
        answer:
          "You must supply essential details such as the project title, a brief description, and any credentials needed for testers to access and evaluate your product.",
      },
    ],
  },
  {
    category: "Bug Reporting & Test Execution",
    questions: [
      {
        question: "How do testers report bugs?",
        answer:
          "Testers can report bugs directly within the project interface. They need to fill out a bug report form, attach screenshots if necessary, and provide a clear description of the issue.",
      },
      {
        question: "What should I do if a bug cannot be reproduced?",
        answer:
          "Testers should include detailed notes about the testing conditions and frequency. This information helps developers diagnose and resolve intermittent issues.",
      },
    ],
  },
  {
    category: "Project Management",
    questions: [
      {
        question: "How can I update my project information?",
        answer:
          "Developers can update project details at any time through the project settings. Simply edit the fields and save the changes to keep your project up to date.",
      },
      {
        question: "Can I assign tests or bugs to specific team members?",
        answer:
          "Yes, the system allows you to assign tasks to individual testers or groups, helping streamline the testing process and improve accountability.",
      },
    ],
  },
  {
    category: "Account Management",
    questions: [
      {
        question: "How can I update my account details?",
        answer:
          "Once logged in, you can manage your account settings from the 'My Profile' section. Here you can update your name, email, and other personal information.",
      },
      {
        question: "How do I change my password?",
        answer:
          "Navigate to the 'Change Password' tab in your profile. Follow the prompts to enter your current password and choose a new one.",
      },
    ],
  },
];

const HelpAndSupport: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Frequently Asked Questions
          </Typography>
          {faqData.map((section) => (
            <Box key={section.category} sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textTransform: "capitalize" }}
              >
                {section.category}
              </Typography>
              {section.questions.map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<FaChevronDown />}>
                    <Typography>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="subtitle1">
              If you have further questions, please contact us at{" "}
              <strong>support@testhorizon.com</strong>.
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default HelpAndSupport;
