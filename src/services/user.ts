import request from ".";

export async function createUser(data: any) {
  return request(`/user`, {
    method: "POST",
    data,
  });
}

export async function getFullUser() {
  return request(`/user`, {
    method: "GET",
  });
}

export async function getOneUser(id: number) {
  return request(`/user/${id}`, {
    method: "GET",
  });
}

export async function getUsers(params: any) {
  return request(`/user`, {
    method: "GET",
    params,
  });
}

export async function searchUsers(params: any) {
  return request(`/user/search-user`, {
    method: "GET",
    params,
  });
}

export async function updateDeleteUser(id_user: number, data: any) {
  return request(`/user/delete-user/${id_user}`, {
    method: "PUT",
    data,
  });
}

export async function updateInfoUser(id_user: number, data: any) {
  return request(`/user/update-user/${id_user}`, {
    method: "PUT",
    data,
  });
}

export async function forgotPassword(params: any) {
  return request(`/user/forgot-password`, {
    method: "PUT",
    params,
  });
}

export async function forgotPasswordId(id: number, data: any) {
  return request(`/user/forgot-password/${id}`, {
    method: "PUT",
    data,
  });
}

export async function changePasswordId(id: number, data: any) {
  return request(`/user/change-password/${id}`, {
    method: "PUT",
    data,
  });
}
