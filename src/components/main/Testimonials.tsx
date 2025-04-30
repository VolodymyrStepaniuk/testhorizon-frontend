import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Rating from "@mui/material/Rating";
import CircularProgress from "@mui/material/CircularProgress";
import { API } from "../../services/api.service";
import { FeedbackResponse } from "../../models/feedback/FeedbackResponse";
import { useTranslation } from "react-i18next";

// Helper function to get initials for avatar fallback
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export default function Testimonials() {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await API.feedbacks.getAll();
        if (response.data._embedded.feedbacks) {
          const sortedFeedbacks = [...response.data._embedded.feedbacks].sort(
            (a, b) => b.rating - a.rating
          );
          setFeedbacks(sortedFeedbacks.slice(0, 6));
        }
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError(t("testimonials.loadError"));
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [t]);

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: "center",
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          gutterBottom
          sx={{
            color: "text.primary",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {t("testimonials.title")}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            color: "text.primary",
            textAlign: "center",
          }}
        >
          {t("testimonials.subtitle")}
        </Typography>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : feedbacks.length === 0 ? (
        <Typography>{t("testimonials.noTestimonials")}</Typography>
      ) : (
        <Grid container spacing={2}>
          {feedbacks.map((feedback, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  bgcolor: "transparent",
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                    <Rating value={feedback.rating} readOnly precision={0.5} />
                  </Box>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {feedback.comment || t("testimonials.defaultComment")}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={`${feedback.owner.firstName} ${feedback.owner.lastName}`}
                      >
                        {getInitials(
                          `${feedback.owner.firstName} ${feedback.owner.lastName}` ||
                            "User"
                        )}
                      </Avatar>
                    }
                    title={
                      <Typography
                        variant="body1"
                        sx={{ color: "text.primary" }}
                      >
                        {`${feedback.owner.firstName} ${feedback.owner.lastName}`}
                      </Typography>
                    }
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
