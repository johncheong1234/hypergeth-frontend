import http from "../http-common-3000";

class TransactionDataService {
  getAllPrimo() {
    return http.get("/read_primo");
  }

  getAllPrimoFailed() {
    return http.get("/read_primo_fail");
  }

  getPrimo(id) {
    return http.get(`/one_primo/${id}`);
  }

  getAllSgx() {
    return http.get("/read_sgx");
  }

  getAllSgxFailed() {
    return http.get("/read_sgx_fail");
  }

  getSgx(id) {
    return http.get(`/one_sgx/${id}`);
  }

  getAllReconcile() {
    return http.get("/read_reconcile");
  }

  getReconcile(id) {
    return http.get(`/one_reconcile/${id}`);
  }
}

export default new TransactionDataService();