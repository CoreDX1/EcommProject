import axios, { AxiosResponse } from "axios";
import { CategoryApi, IEcommerse } from "../Interface/Ecommerce";

class Menu<T> implements CategoryApi<T> {
  private root: string = "http://localhost:5020/api";
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

  public post = async (info: IEcommerse["loginResponse"]): Promise<T> => {
    const { data } = await axios({
      method: "post",
        url: `${this.root}/${this.url}/token`,
      data: info,
    });
    return data;
  };
}

class Sesion {
  private root: string = "http://localhost:5020/api";
  private url: string = "Usuario";
  constructor(url: string) {
    this.url = url;
  }

  public login = async (info: IEcommerse["loginRequest"]) => {
    const { data } = await axios({
      method: "post",
        url: `${this.root}/${this.url}/token`,
      data: info,
    });
    return data;
  };

  public register = async (info: IEcommerse["registerRequest"]) => {
    const { data } = await axios({
      method: "post",
        url: `${this.root}/${this.url}/register`,
      data: info,
    });
    return data;
  }
}

export const ListGet = {
  menuDinamic: new Menu<IEcommerse["imenuDinamic"]>("Menu"),
  usuario: new Menu<IEcommerse["registerResponse"]>("Usuario"),
  home : new Menu<IEcommerse["home"]>("Home/GetHome"),
  // login: new Menu<IEcommerse["login"]>("Usuario"),
  sesion: new Sesion("Usuario"),
};
