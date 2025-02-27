export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const scrollToSectionMobile = (
  id: string,
  closeDrawer?: () => void,
  delay: number = 300
) => {
  if (closeDrawer) {
    closeDrawer();
  }
  setTimeout(() => {
    scrollToSection(id);
  }, delay);
};
