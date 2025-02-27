export const UserAuthorityName = {
  DEVELOPER: "Developer",
  TESTER: "Tester",
} as const;
export type UserAuthorityName =
  (typeof UserAuthorityName)[keyof typeof UserAuthorityName];
