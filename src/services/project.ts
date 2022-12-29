import request from ".";
export async function getFullProject(params?: any) {
  return request(`/project/search-project`, {
    method: "GET",
    params,
  });
}

export async function createProject(data: any) {
  return request(`/project`, {
    method: "POST",
    data,
  });
}

export async function create(data: any, type: string) {
  return request(`/${type}`, {
    method: "POST",
    data,
  });
}

export async function getProjectAll(id: number) {
  return request(`/project/${id}`, {
    method: "GET",
  });
}
export async function getNotifycations(id_user: number) {
  return request(`/project/notify/${id_user}`, {
    method: "GET",
  });
}

export async function updateDeleteProject(id_project: number, data: any) {
  return request(`/project/delete/${id_project}`, {
    method: "PUT",
    data,
  });
}
