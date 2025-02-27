import SvgIcon from "@mui/material/SvgIcon";
import logo from "../../assets/TestHorizon.png";

export default function AppIcon() {
  return (
    <SvgIcon sx={{ height: 50, width: 150 }} viewBox="0 0 150 50">
      <svg
        width={150}
        height={50}
        viewBox="0 0 150 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image
          href={logo}
          x="0"
          y="48%"
          height="30"
          width="30"
          transform="translate(0, -15)"
        />
        <text
          x="40"
          y="50%"
          fill="white"
          fontSize="12"
          fontFamily="Arvo"
          fontWeight="bold"
          textAnchor="start"
          dominantBaseline="middle"
        >
          Test Horizon
        </text>
      </svg>
    </SvgIcon>
  );
}
