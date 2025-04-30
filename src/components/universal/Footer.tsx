import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { useTranslation } from "react-i18next";

const StyledFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  color: "#fff",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  position: "relative",
  zIndex: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: "#fff",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    color: "hsl(220deg 20% 25% / 60%)",
  },
  "&:focus": {
    outline: "2px solid hsl(220deg 20% 25% / 60%)",
    outlineOffset: "2px",
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "translateX(5px)",
  },
}));

const SmartFooter: React.FC = () => {
  const { t } = useTranslation();

  const socialMedia = [
    { icon: FaFacebook, label: t("footer.followUs.facebook") },
    { icon: FaTwitter, label: t("footer.followUs.twitter") },
    { icon: FaInstagram, label: t("footer.followUs.instagram") },
    { icon: FaLinkedin, label: t("footer.followUs.linkedin") },
  ];

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              {t("footer.aboutUs.title")}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {t("footer.aboutUs.description")}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
              {t("footer.quickLinks.title")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="#">{t("footer.quickLinks.home")}</Link>
              <Link href="#">{t("footer.quickLinks.services")}</Link>
              <Link href="#">{t("footer.quickLinks.products")}</Link>
              <Link href="#">{t("footer.quickLinks.contact")}</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
              {t("footer.contactInfo.title")}
            </Typography>
            <ContactItem>
              <MdLocationOn style={{ marginRight: "8px" }} />
              <Typography variant="body2">
                {t("footer.contactInfo.address")}
              </Typography>
            </ContactItem>
            <ContactItem>
              <MdPhone style={{ marginRight: "8px" }} />
              <Typography variant="body2">
                {t("footer.contactInfo.phone")}
              </Typography>
            </ContactItem>
            <ContactItem>
              <MdEmail style={{ marginRight: "8px" }} />
              <Typography variant="body2">
                {t("footer.contactInfo.email")}
              </Typography>
            </ContactItem>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
              {t("footer.followUs.title")}
            </Typography>
            {socialMedia.map(({ icon: Icon, label }) => (
              <Tooltip key={label} title={label} arrow>
                <SocialButton aria-label={label.toLowerCase()}>
                  <Icon />
                </SocialButton>
              </Tooltip>
            ))}
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
};

export default SmartFooter;
