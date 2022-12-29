import request from ".";

export async function getDocsById(id: number) {
  return request(`/docs/${id}`, {
    method: "GEt",
  });
}

export async function createDocs(data: any) {
  return request(`/docs`, {
    method: "POST",
    data,
  });
}

export async function updateDocs(id: number, data: any) {
  return request(`/docs/update/${id}`, {
    method: "PUT",
    data,
  });
}

export async function deleteDocs(id: number) {
  return request(`docs`, {
    method: "PUT",
  });
}
