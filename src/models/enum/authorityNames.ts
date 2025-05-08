export const AuthorityName = {
  MENTOR: "MENTOR",
  TESTER: "TESTER",
  ADMIN: "ADMIN",
} as const;
export type AuthorityName = (typeof AuthorityName)[keyof typeof AuthorityName];
