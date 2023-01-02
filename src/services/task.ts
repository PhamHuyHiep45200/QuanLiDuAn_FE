import request from ".";

export async function createTask(data: any) {
  return request(`/task`, {
    method: "POST",
    data,
  });
}

export async function getTaskAll(id: number, params?: any) {
  return request(`/task/${id}`, {
    method: "GET",
    params,
  });
}
export async function updateTask(id: number, data: any) {
  return request(`/task/update/${id}`, {
    method: "PUT",
    data,
  });
}
export async function deleteTask(id: number) {
  return request(`/task/delete/${id}`, {
    method: "DELETE",
  });
}
