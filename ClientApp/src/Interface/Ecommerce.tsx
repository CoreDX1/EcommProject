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
  name: string;
  password: string;
}

export interface CategoryApi<T> {
  getAll: () => Promise<T[]>;
}

interface Login {
  success: boolean;
  messsage: string;
  usuarioApi: { id_user: number; name: string; password: string; rol: string };
  result: string;
}

interface Register{
  success: boolean;
  message : string;
}

export interface IEcommerse {
  category: Category;
  subcategory: SubCategory;
  imenuDinamic: IMenuDinamic;
  usuario: Usuario;
  login: Login;
  register : Register;
}
