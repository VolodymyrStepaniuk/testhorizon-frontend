export const ProjectStatus = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  PAUSED: "Paused",
} as const;
export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
