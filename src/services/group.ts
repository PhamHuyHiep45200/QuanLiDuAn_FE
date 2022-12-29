import request from ".";

export async function getFullGroup(params: any) {
  return request(`/group/search-group`, {
    method: "GET",
    params,
  });
}

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

export async function updateDeleteGroup(id_group: number, data: any) {
  return request(`/group/delete/${id_group}`, {
    method: "PUT",
    data,
  });
}
