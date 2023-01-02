import request from ".";

export async function getCalendar(params: any) {
  return request(`/task/calendar`, {
    method: "GET",
    params,
  });
}
