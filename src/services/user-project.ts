import request from ".";

export async function addUserProject(data: any) {
  return request(`/user-project`, {
    method: "POST",
    data,
  });
}

export async function getUserProject(id: number) {
  return request(`/user-project/${id}`, {
    method: "GET",
  });
}

export async function updateNitifyProject(id: number | string, data: any) {
  return request(`/user-project/${id}`, {
    method: "PUT",
    data,
  });
}

export async function deleteUserProject(id: number | string, data: any) {
  return request(`/user-project/delete/${id}`, {
    method: "PUT",
    data,
  });
}
