import request from ".";

export async function addUserProject(data: any) {
  return request(`/user-project`, {
    method: "POST",
    data,
  });
}

export async function updateNitifyProject(id: number, data: any) {
  return request(`/user-project/${id}`, {
    method: "PUT",
    data,
  });
}
