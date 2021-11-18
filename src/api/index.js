const api = (route, data) =>
  fetch(`https://database-petroller.herokuapp.com/api/v1${route}`, {
    method: data.method || "GET",
    headers: { "Content-Type": "application/json" },
    ...data,
  });

export default api;
