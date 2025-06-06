import { Grid } from "@mui/material";
import { UserRoleProps } from "../../../models/userProps";
import MentorCharts from "./roleBasedCharts/MentorCharts";
import { AuthorityName } from "../../../models/enum/authorityNames";
import AdminCharts from "./roleBasedCharts/AdminCharts";
import TesterCharts from "./roleBasedCharts/TesterCharts";

const Charts: React.FC<UserRoleProps> = ({ currentUserRole }) => {
  const renderCharts = () => {
    switch (currentUserRole) {
      case AuthorityName.ADMIN:
        return <AdminCharts currentUserRole={currentUserRole} />;
      case AuthorityName.MENTOR:
        return <MentorCharts currentUserRole={currentUserRole} />;
      case AuthorityName.TESTER:
        return <TesterCharts currentUserRole={currentUserRole} />;
    }
  };

  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {renderCharts()}
    </Grid>
  );
};

export default Charts;
