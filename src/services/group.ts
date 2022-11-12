import request from ".";

export async function createGroup(data: any) {
  return request(`/group`, {
    method: "POST",
    data,
  });
}

export async function getGroupInProject(id: number) {
  return request(`/group/${id}`, {
    method: "GET",
  });
}
