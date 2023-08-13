import Cookies from "js-cookie";

export function isAuthenticated() {
  const authToken = Cookies.get("token"); // Retrieve the authentication token from storage

  return authToken !== null && authToken !== undefined;
}
