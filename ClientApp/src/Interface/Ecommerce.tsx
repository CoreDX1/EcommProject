export interface Category{
    id_category : number;
    name : string
}

export interface CategoryApi<T> {
    Category : () => Promise<T[]>
}
