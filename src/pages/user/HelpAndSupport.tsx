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
import { useTranslation } from "react-i18next";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
}));

const HelpAndSupport: React.FC = () => {
  const { t } = useTranslation();

  // Categories to display
  const categories = [
    "projectCreation",
    "bugReporting",
    "projectManagement",
    "accountManagement",
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            {t("helpAndSupport.title")}
          </Typography>
          {categories.map((category) => (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textTransform: "capitalize" }}
              >
                {t(`helpAndSupport.categories.${category}`)}
              </Typography>
              {t(`helpAndSupport.faqData.${category}`, {
                returnObjects: true,
              }).map((faq: any, index: number) => (
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
              {t("helpAndSupport.contactInfo")}{" "}
              <strong>{t("helpAndSupport.email")}</strong>.
            </Typography>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default HelpAndSupport;
