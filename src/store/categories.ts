import { defineStore } from "pinia";
import { computed } from "vue";
import { baseUrl } from ".";
import { defApiPinia } from "vuequeries/pinia";

export const useCategoriesStore = defineStore("categories", () => {
  const api = defApiPinia<ICategory, ICategory[]>({
    url: baseUrl("/categories"), expiresIn: 5, tokenKey: "token"
  });

  return {
    state: api.computedState,
    fetchCategories: () => api.getAll(),
    fetchCategory: (id: number) => api.getOne(id),
    createCategory: () => api.create<{ name: string, info: string }>(),
    updateCategory: (id: number) => api.update<{ name: string }>(id),
    deleteCategory: (id: number) => api.delete(id),
  }
})

export interface ICategory {
  id: number;
  name: string;
  info: string;
  created_at: string;
  image: string;
}