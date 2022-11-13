import request from ".";

export async function createItem(data: any) {
  return request(`/item`, {
    method: "POST",
    data,
  });
}

export async function getItemAll(id: number) {
  return request(`/item/${id}`, {
    method: "GET",
  });
}

export async function searchUserAll(id: number) {
  return request(`/item/get-user-group/${id}`, {
    method: "GET",
  });
}
export async function searchUserId(id: number, params: any) {
  return request(`/item/get-user-group/${id}`, {
    method: "GET",
    params,
  });
}
