import request from ".";

export async function getUsers(params: any) {
  return request(`/user`, {
    method: "GET",
    params,
  });
}

export async function searchUsers(params: any) {
  return request(`/user/search-user`, {
    method: "GET",
    params,
  });
}
