interface Category {
  id_category: number;
  name: string;
  subMenu: Array<SubCategory>;
}

interface SubCategory {
  id_sub_category: number;
  name: string;
  id_category: number;
}

interface IMenuDinamic {
  id_category: number;
  name: string;
  submenu: Array<string>;
}

interface Usuario {
  id_user: number;
  name: string;
  password: string;
}

export interface CategoryApi<T> {
  getAll: () => Promise<T[]>;
}

export interface IEcommerse {
  category: Category;
  subcategory: SubCategory;
  imenuDinamic: IMenuDinamic;
  usuario: Usuario;
}
