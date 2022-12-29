import request from ".";

export async function getAllWorkMe(id: number) {
  return request(`/work-me/${id}`, {
    method: "GET",
  });
}
