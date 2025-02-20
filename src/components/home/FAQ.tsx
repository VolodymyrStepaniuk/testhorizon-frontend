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

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

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
        variant="h4"
        sx={{
          width: { xs: "90%", sm: "100%", md: "60%" },
          textAlign: "center",
        }}
        className="nunito-bold"
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ borderRadius: "8px 8px 0 0" }}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography component="span" variant="subtitle2">
              How can I upload my project to the platform?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ maxWidth: { md: "70%" } }}>
              To upload your project, simply log in to your account with the
              «Developer» role, go to the «My Projects» section and follow the
              steps to create your project!
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ borderRadius: 0 }}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography component="span" variant="subtitle2">
              How can I test the projects shared by others?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ maxWidth: { md: "70%" } }}>
              Once a project is uploaded, you can access it under the "Available
              Projects" tab. Click on the project to begin testing, and follow
              the guidelines provided by the project owner.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{ borderRadius: 0 }}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography component="span" variant="subtitle2">
              Can I provide feedback on a project I’ve tested?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ maxWidth: { md: "70%" } }}>
              Yes, when testing a project, you can leave feedback by rating the
              project and leaving comments. This helps both project authors and
              other testers to improve their work.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          sx={{ borderRadius: "0 0 8px 8px" }}
        >
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography component="span" variant="subtitle2">
              Is there a limit to the number of projects I can test?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ maxWidth: { md: "70%" } }}>
              There is no limit! You can test as many projects as you like and
              gain experience from various domains. The more projects you test,
              the more you learn.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
