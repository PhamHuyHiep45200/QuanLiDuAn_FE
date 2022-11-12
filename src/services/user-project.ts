import request from ".";

export async function addUserProject(data: any) {
  return request(`/user-project`, {
    method: "POST",
    data,
  });
}
