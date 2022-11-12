import request from ".";

export interface LoginType {
  email: string;
  password: string;
}

export async function login(data: LoginType) {
  return request(`/auth`, {
    method: "POST",
    data,
  });
}
