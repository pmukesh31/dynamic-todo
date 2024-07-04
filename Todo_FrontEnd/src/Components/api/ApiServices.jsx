import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8585",
});

export const reterieveHelloWorldBean = (username) =>
  apiClient.get(`/hello-world/path-variable/${username}`, {
    headers: {
      Authorization: "Basic bXVrZXNoOjEyMw==",
    },
  });

export const reteriveTodoList = (username) =>
  apiClient.get(`/${username}/todos`);

export const deleteItem = (username, id) =>
  apiClient.delete(`/${username}/todos/${id}`);

export const reterieveTodoItem = (username, id) =>
  apiClient.get(`${username}/todo/${id}`);

export const updateTodoItem = (username, id, todo) =>
  apiClient.put(`${username}/todo/${id}`, todo);

export const createTodoItem = (username, todo) =>
  apiClient.put(`${username}/todo`, todo);

export const executeBasicAuthentication = (token) =>
  apiClient.get("/hello-world", {
    headers: {
      Authorization: token,
    },
  });
