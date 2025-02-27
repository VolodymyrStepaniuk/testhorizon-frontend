import { useNavigate } from "react-router-dom";
import { scrollToSection } from "./scrollUtils";

export const navigateAndScroll = (
  path: string,
  id: string,
  navigate: ReturnType<typeof useNavigate>
) => {
  navigate(path);

  if (id.length > 0) {
    setTimeout(() => {
      scrollToSection(id);
    }, 100);
  }
};

export const navigateAndScrollMobile = (
  path: string,
  id: string,
  navigate: ReturnType<typeof useNavigate>,
  closeDrawer?: () => void
) => {
  if (closeDrawer) {
    closeDrawer();
  }

  navigateAndScroll(path, id, navigate);
};
