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

const FooterLink = styled(Link)(() => ({
  color: "#fff",
  textDecoration: "none",
  transition: "color 0.2s ease",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -2,
    left: 0,
    width: 0,
    height: "2px",
    background: "hsl(220deg 20% 25% / 60%)",
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: "100%",
  },
  "&:hover": {
    color: "hsl(220deg 20% 25% / 60%)",
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
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="nunito-bold" gutterBottom>
              About Us
            </Typography>
            <Typography
              variant="body2"
              className="nunito-regular"
              sx={{ mb: 2 }}
            >
              We strive to provide effective solutions for hands-on software
              testing, helping users around the world to improve their skills.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="nunito-bold" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FooterLink href="#" className="nunito-regular">
                Home
              </FooterLink>
              <FooterLink href="#" className="nunito-regular">
                Services
              </FooterLink>
              <FooterLink href="#" className="nunito-regular">
                Products
              </FooterLink>
              <FooterLink href="#" className="nunito-regular">
                Contact
              </FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom className="nunito-bold">
              Contact Info
            </Typography>
            <ContactItem>
              <MdLocationOn style={{ marginRight: "8px" }} />
              <Typography variant="body2" className="nunito-regular">
                144 Zamarstynivska Street, Lviv 79000
              </Typography>
            </ContactItem>
            <ContactItem>
              <MdPhone style={{ marginRight: "8px" }} />
              <Typography variant="body2" className="nunito-regular">
                +38 068 300 56 54
              </Typography>
            </ContactItem>
            <ContactItem>
              <MdEmail style={{ marginRight: "8px" }} />
              <Typography variant="body2" className="nunito-regular">
                volodymyr.stepaniuk04@gmail.com
              </Typography>
            </ContactItem>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom className="nunito-bold">
              Follow Us
            </Typography>
            {[
              { icon: FaFacebook, label: "Facebook" },
              { icon: FaTwitter, label: "Twitter" },
              { icon: FaInstagram, label: "Instagram" },
              { icon: FaLinkedin, label: "LinkedIn" },
            ].map(({ icon: Icon, label }) => (
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
