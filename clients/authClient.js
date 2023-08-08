export function isAuthenticated() {
  const authToken = localStorage.getItem("authToken"); // Retrieve the authentication token from storage

  return authToken !== null && authToken !== undefined;
}
