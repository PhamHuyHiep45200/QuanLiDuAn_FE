import request from ".";

export async function addUserGroup(data: any) {
  return request(`/user-group`, {
    method: "POST",
    data,
  });
}

export async function getUserGroup(id: number) {
  return request(`/user-group/${id}`, {
    method: "GET",
  });
}

export async function getUserGroupItem(id: number) {
  return request(`/user-group/task/${id}`, {
    method: "GET",
  });
}

export async function updateStatusNotifyGroup(id: number, data: any) {
  return request(`/user-group/${id}`, {
    method: "PUT",
    data,
  });
}

export async function searchUserAddGroup(id: number) {
  return request(`/user-group/search-group/${id}`, {
    method: "GET",
  });
}
