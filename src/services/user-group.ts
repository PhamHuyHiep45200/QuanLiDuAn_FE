import request from ".";

export async function addUserGroup(data: any) {
  return request(`/user-group`, {
    method: "POST",
    data,
  });
}
