import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
}
export default function BreadcrumbNav({ title }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Breadcrumbs sx={{ mb: 3 }}>
      <Link
        component="button"
        variant="body2"
        onClick={() => navigate("/blog")}
      >
        {t("blog.title")}
      </Link>
      <Typography color="text.primary">{title}</Typography>
    </Breadcrumbs>
  );
}
