import request from ".";

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