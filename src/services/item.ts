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
