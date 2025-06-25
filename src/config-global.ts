import { paths } from "./routes/path";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const LOGIN_PATH = paths.auth.login;
export const DASHBOARD_PATH = paths.home;
