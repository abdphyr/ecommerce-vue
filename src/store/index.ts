export * from "./auth.pages";
export * from "./categories";
export * from "./products";
export * from "./auth";
export * from "./resapi";

export function baseUrl(endpoint: string) {
  return "http://127.0.0.1:8000/api" + endpoint;
}