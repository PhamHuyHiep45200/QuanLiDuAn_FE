import request from ".";

export async function getChartItem(id: number) {
  return request(`/chart/${id}`, {
    method: "GET",
  });
}
