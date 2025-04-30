import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: "1px solid hsl(220deg 20% 25% / 60%)",
  backgroundColor: "transparent",
  color: "white",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem", color: "white" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid hsl(220deg 20% 25% / 60%)",
}));

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const { t } = useTranslation();

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  // Get FAQ questions and answers from translations
  const questions = t("faq.questions", { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
        backgroundColor: "transparent",
      }}
    >
      <Typography
        component="h2"
        variant="h2"
        sx={{
          width: { xs: "90%", sm: "100%", md: "60%" },
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        {t("faq.title")}
      </Typography>
      <Box sx={{ width: "100%" }}>
        {questions.map((item, index) => (
          <Accordion
            key={`panel${index + 1}`}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
            sx={{
              borderRadius:
                index === 0
                  ? "8px 8px 0 0"
                  : index === questions.length - 1
                  ? "0 0 8px 8px"
                  : 0,
            }}
          >
            <AccordionSummary
              aria-controls={`panel${index + 1}d-content`}
              id={`panel${index + 1}d-header`}
            >
              <Typography component="span" variant="subtitle2">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ maxWidth: { md: "70%" } }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
