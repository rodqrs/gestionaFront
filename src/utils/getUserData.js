import { USER_SESSION } from "./const";

export default function getUserData() {
  const sessionData = sessionStorage.getItem(USER_SESSION);

  if (!sessionData) throw new Error("The User session is invalid");

  return JSON.parse(sessionData);
}
