import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TestResponse } from "../../../../models/test/TestResponse";
import { TestTypeChip } from "../../../../theme/customization/chips";

const TestItem = ({ test }: { test: TestResponse }) => {
  const navigate = useNavigate();
  const fullName = `${test.author.firstName} ${test.author.lastName || ""}`;

  const handleTitleClick = () => {
    navigate(`/tests/${test.id}`);
  };

  return (
    <Card variant="outlined" sx={{ my: 1 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            onClick={handleTitleClick}
            sx={{
              textDecoration: "none",
              color: "primary.main",
              cursor: "pointer",
            }}
          >
            {test.title}
          </Typography>
          <TestTypeChip testtype={test.type} />
        </Box>
        <Divider sx={{ my: 1 }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {test.description || "No description provided."}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Avatar
            sx={{ width: 24, height: 24, mr: 1, fontSize: "0.8rem" }}
            alt={fullName}
          >
            {test.author.firstName.charAt(0)}
          </Avatar>
          <Typography variant="body2">{fullName}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestItem;
