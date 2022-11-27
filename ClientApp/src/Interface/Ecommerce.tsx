export interface Category{
    id_category : number;
    name : string
}

export interface SubCategory{
    id_sub_category : number;
    name : string;
    id_category : number
}

export interface CategoryApi<T> {
    getAll : () => Promise<T[]>
}
