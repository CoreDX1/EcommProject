import axios, { AxiosResponse } from "axios";
import { CategoryApi, IEcommerse } from "../Interface/Ecommerce";

class Menu<T> implements CategoryApi<T> {
  private root : string = "http://localhost:5020/api";
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  public getAll: () => Promise<T[]> = async (): Promise<T[]> => {
    const { data }: AxiosResponse<T[]> = await axios.get(
      `${this.root}/${this.url}`
    );
    return data;
  };
}

export const ListGet = {
  menuDinamic: new Menu<IEcommerse["imenuDinamic"]>("Menu"),
  usuario: new Menu<IEcommerse["usuario"]>("Usuario"),
};