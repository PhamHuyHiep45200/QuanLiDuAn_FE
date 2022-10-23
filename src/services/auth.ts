import request from ".";

export async function login() {
  return request(`/user`, {
    method: "GET",
  });
}
