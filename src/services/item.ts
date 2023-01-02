import request from ".";

export async function getFullItem() {
  return request(`/item`, {
    method: "GET",
  });
}

export async function searchItem(params: any) {
  return request(`/item/search-item`, {
    method: "GET",
    params,
  });
}

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
  return request(`/item/get-all-user-group/${id}`, {
    method: "GET",
  });
}
export async function searchUserQuery(id: number, params: any) {
  return request(`/item/get-user-group/${id}`, {
    method: "GET",
    params,
  });
}

export async function updateItem(id_item: number, data: any) {
  return request(`/item/update/${id_item}`, {
    method: "PUT",
    data,
  });
}

export async function updateDeleteItem(id_item: number, data: any) {
  return request(`/item/delete/${id_item}`, {
    method: "PUT",
    data,
  });
}
