import request from ".";

export async function getCommentTask(idTask: number) {
  return request(`/comment-task/${idTask}`, {
    method: "GET",
  });
}

export async function createComment(data: any) {
  return request(`/comment-task`, {
    method: "POST",
    data,
  });
}

export async function updateComment(id: number, data: any) {
  return request(`/comment-task/update/${id}`, {
    method: "PUT",
    data,
  });
}

export async function deleteComment(id: number) {
  return request(`/comment-task/delete/${id}`, {
    method: "PUT",
  });
}
