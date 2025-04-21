export const AuthorityName = {
  DEVELOPER: "DEVELOPER",
  TESTER: "TESTER",
  ADMIN: "ADMIN",
} as const;
export type AuthorityName = (typeof AuthorityName)[keyof typeof AuthorityName];
