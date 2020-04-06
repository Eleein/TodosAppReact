function createMethod(methodName) {
  return {
    method: methodName.toUpperCase(),
    headers: {
      "Content-Type": "application/JSON"
    }
  };
}

export const httpMethods = {
  post: "post",
  put: "put",
  get: "get",
  delete: "delete"
};

export async function apiRequest(url, method, data) {
  const _method = createMethod(method);

  if (method !== httpMethods.get || method !== httpMethods.delete) {
    _method.body = JSON.stringify(data);
  }

  const response = await fetch(url, _method);

  if (response.ok) {
    return await response.json();
  }
  throw new Error("Request failed!");
}
