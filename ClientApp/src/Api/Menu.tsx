import axios, { AxiosResponse } from "axios";
import { Category, CategoryApi } from "../Interface/Ecommerce";

class Menu<T> implements CategoryApi<T> {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public Category = async (): Promise<T[]> => {
    const { data }: AxiosResponse<T[]> = await axios.get(this.url);
    return data;
  };
}

const url = "http://localhost:5020/api/Products";

export const MenuApi = new Menu<Category>(url);
