export const AuthorityName = {
  DEVELOPER: "Developer",
  TESTER: "Tester",
  ADMIN: "Admin",
} as const;
export type AuthorityName = (typeof AuthorityName)[keyof typeof AuthorityName];
