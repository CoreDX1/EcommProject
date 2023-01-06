interface Category {
    id_category: number
    name: string
    subMenu: Array<SubCategory>
}

interface SubCategory {
    id_sub_category: number
    name: string
    id_category: number
}

interface IMenuDinamic {
    id_category: number
    name: string
    submenu: Array<string>
}

export interface CategoryApi<T> {
    getAll: () => Promise<T[]>
}

interface LoginResponse {
    success: boolean
    messsage: string
    usuarioApi: {
        id_user: number
        username: string
        email: string
        password: string
        rol: string
    }
    result: string
}

interface LoginRequest {
    email: string
    password: string
}
interface IHome {
    id_home: number
    title: string
    price: number
    image: string
}
interface IPostHome{
    title: string
    price: number
    image: string
}
export interface IHomeID {
    id_home: number | null
}

interface RegisterRequest {
    username: string
    email: string
    password: string
}

interface RegisterResponse {
    success: boolean
    message: string
}

export interface IEcommerse {
    category: Category
    subcategory: SubCategory
    imenuDinamic: IMenuDinamic
    home: IHome
    postHome: IPostHome
}

export interface ISesion<T, U> {
    login: (info: T) => Promise<U>
}

export interface ISesionAuth {
    loginResponse: LoginResponse
    loginRequest: LoginRequest
    registerResponse: RegisterResponse
    registerRequest: RegisterRequest
}
