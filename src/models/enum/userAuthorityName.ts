export const UserAuthorityName = {
  MENTOR: "MENTOR",
  TESTER: "TESTER",
} as const;
export type UserAuthorityName =
  (typeof UserAuthorityName)[keyof typeof UserAuthorityName];
