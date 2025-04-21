export const UserAuthorityName = {
  DEVELOPER: "DEVELOPER",
  TESTER: "TESTER",
} as const;
export type UserAuthorityName =
  (typeof UserAuthorityName)[keyof typeof UserAuthorityName];
