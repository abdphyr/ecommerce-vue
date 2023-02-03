import { baseUrl } from ".";
import { useModif } from "vuequeries";


export const useRegister = () => useModif<IAuthResponse, RegisterDTO>(baseUrl("/register"), "post");
export const useLogin = () => useModif<IAuthResponse, LoginDTO>(baseUrl("/login"), "post");

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string,
  user: {
    id: 1,
    name: string;
    email: string;
    phone: number;
    created_at: string;
    image: string;
    roles: {
      id: 1;
      name: string;
    }[]
  }
}