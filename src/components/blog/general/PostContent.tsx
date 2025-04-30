import { Box, SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

interface PostContentProps {
  dangerouslySetInnerHTML: { __html: string };
  sx?: SxProps<Theme>;
}

const StyledContent = styled(Box)(({ theme }) => ({
  "& img": {
    maxWidth: "100%",
    height: "auto",
    borderRadius: theme.shape.borderRadius,
    margin: `${theme.spacing(2)} 0`,
  },
  "& h1, & h2, & h3, & h4, & h5, & h6": {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1.5),
    fontWeight: 600,
  },
  "& p": {
    marginBottom: theme.spacing(2),
  },
  "& ul, & ol": {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  "& blockquote": {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1, 2),
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.background.default,
  },
  "& pre": {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    overflowX: "auto",
    marginBottom: theme.spacing(2),
  },
  "& code": {
    fontFamily: "monospace",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
  },
  "& a": {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function PostContent({
  dangerouslySetInnerHTML,
  sx,
}: PostContentProps) {
  return (
    <StyledContent dangerouslySetInnerHTML={dangerouslySetInnerHTML} sx={sx} />
  );
}
