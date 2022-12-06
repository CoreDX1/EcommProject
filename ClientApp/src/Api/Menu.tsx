import axios, { AxiosResponse } from "axios";
import { Category, SubCategory, CategoryApi , IMenuDinamic } from "../Interface/Ecommerce";

class Menu<T> implements CategoryApi<T> {
  private root: string;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.root = "http://localhost:5020/api";
  }

  public getAll = async (): Promise<T[]> => {
    const { data }: AxiosResponse<T[]> = await axios.get(
      `${this.root}/${this.url}`
    );
    return data;
  };
}

const urlCategory = "Category";
const urlSubCategory = "SubCategory";
const urlMenu = "Menu";

export const MenuCategory = new Menu<Category>(urlCategory);
export const MenuSubcategory = new Menu<SubCategory>(urlSubCategory);

export const MenuDinamic = new Menu<IMenuDinamic>(urlMenu);
