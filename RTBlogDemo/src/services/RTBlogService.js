import http from "../http-client";

class RTBlogService {
  getAll(params) {
    return http.get("/rtblogs", { params });
  }

  get(id) {
    return http.get(`/rtblogs/${id}`);
  }

  create(data) {
    return http.post("/rtblogs", data);
  }

  update(id, data) {
    return http.put(`/rtblogs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/rtblogs/${id}`);
  }

  deleteAll() {
    return http.delete(`/rtblogs`);
  }
}

export default new RTBlogService();
