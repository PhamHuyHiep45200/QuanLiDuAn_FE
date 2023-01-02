import request from ".";

export async function getChartItem(id: number) {
  return request(`/chart/${id}`, {
    method: "GET",
  });
}

export async function getFullStatistic() {
  return request(`/chart/statistic/full`, {
    method: "GET",
  });
}
