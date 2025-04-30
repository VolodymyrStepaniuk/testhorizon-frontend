import React, { useState, MouseEvent } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import UKFlag from "../../assets/flags/UKFlag.png";
import UAFlag from "../../assets/flags/UAFlag.png";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  label: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "uk", label: "Українська", flag: UAFlag },
  { code: "en", label: "English", flag: UKFlag },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<Language>(LANGUAGES[0]);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (lang: Language) => {
    setSelected(lang);
    handleClose();
    i18n.changeLanguage(lang.code);
  };

  return (
    <>
      <Button
        id="language-selector"
        onClick={handleClick}
        variant="outlined"
        sx={{
          textTransform: "none",
          padding: "10px", // Even padding on all sides
          minWidth: "unset", // Remove minimum width requirement
        }}
      >
        <img
          src={selected.flag}
          alt={selected.code}
          width={24}
          style={{ borderRadius: 2 }}
        />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "language-selector" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={lang.code === selected.code}
            onClick={() => handleSelect(lang)}
          >
            <ListItemIcon>
              <img
                src={lang.flag}
                alt={lang.code}
                width={24}
                style={{ borderRadius: 2 }}
              />
            </ListItemIcon>
            <ListItemText>{lang.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
