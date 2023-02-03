import { defineStore } from "pinia";
import { baseUrl } from ".";
import { defApiPinia } from "vuequeries/pinia";

export const useProductsStore = defineStore("products", () => {
  const api = defApiPinia<IProductOne, IProducts>({
    url: baseUrl("/products"), expiresIn: 2, tokenKey: "auth"
  });

  return {
    state: api.computedState,
    fetchProducts: (params?: IProParams | string) => api.getAll(params),
    fetchProduct: (id: number) => api.getOne(id),
    createProduct: () => api.create<CreateProDTO>(),
    updateProduct: (id: number) => api.update<UpdateProDTO>(id),
    deleteProduct: (id: number) => api.delete(id),
  }
})

type IProParams = {
  search?: string;
  price?: string | number;
  page?: string | number;
  sort?: string;
};

interface IProductAllOne {
  id: number,
  user_id: number,
  name: string,
  price: number,
  info: string,
  created_at: string,
  category_name: string,
  tags: {
    id: 1,
    name: string
  }[],
  image: string
}

interface IProducts {
  minPrice: number,
  maxPrice: number,
  products: {
    current_page: number,
    data: IProductAllOne[],
    last_page: number,
    per_page: number,
    total: number
  }
}

interface IProductOne {
  id: number,
  user_id: number,
  name: string,
  price: number,
  info: string,
  created_at: string,
  images: {
    id: 1,
    url: string
  }[],
  category: {
    id: number,
    name: string,
    info: string,
    created_at: string,
    image: string
  },
  user: {
    id: number,
    name: string,
    email: string,
    phone: number,
    created_at: string,
    image: string,
    roles: {
      id: 1,
      name: string
    }[]
  }
}

interface CreateProDTO { name: string, info: string }
interface UpdateProDTO { name: string }