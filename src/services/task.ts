import request from ".";

export async function createTask(data: any) {
  return request(`/task`, {
    method: "POST",
    data,
  });
}

export async function getTaskAll(id: number) {
  return request(`/task/${id}`, {
    method: "GET",
  });
}
export async function updateTask(id: number, params: any) {
  return request(`/task/${id}`, {
    method: "PUT",
    params,
  });
}
