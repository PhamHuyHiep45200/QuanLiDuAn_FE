import request from ".";

export async function getUsers(params: any) {
  return request(`/user`, {
    method: "GET",
    params,
  });
}
