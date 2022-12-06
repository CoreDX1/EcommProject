export interface Category{
    id_category: number;
    name : string
    subMenu : Array<SubCategory>
}

export interface SubCategory{
    id_sub_category : number;
    name : string;
    id_category : number
}

export interface IMenuDinamic{
    id_category : 1,
    name : string
    submenu : Array<string>
}

export interface CategoryApi<T> {
    getAll : () => Promise<T[]>
}
