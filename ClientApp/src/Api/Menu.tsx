import axios, { AxiosResponse } from 'axios'
import { CategoryApi, IEcommerse, IHomeID } from '../Interface/Ecommerce'

class Menu<T> implements CategoryApi<T> {
    private root: string = 'http://localhost:5020/api'
    private url: string

    constructor(url: string) {
        this.url = url
    }

    public getAll: () => Promise<T[]> = async (): Promise<T[]> => {
        const { data }: AxiosResponse<T[]> = await axios.get(
            `${this.root}/${this.url}`
        )
        return data
    }

    public post = async (info: IEcommerse['loginResponse']): Promise<T> => {
        const { data } = await axios({
            method: 'post',
            url: `${this.root}/${this.url}/token`,
            data: info,
        })
        return data
    }
}

class Sesion {
    private root: string = 'http://localhost:5020/api'
    private url: string = 'Usuario'
    constructor(url: string) {
        this.url = url
    }

    public login = async (info: IEcommerse['loginRequest']) => {
        const { data } = await axios({
            method: 'post',
            url: `${this.root}/${this.url}/token`,
            data: info,
        })
        return data
    }

    public register = async (info: IEcommerse['registerRequest']) => {
        const { data } = await axios({
            method: 'post',
            url: `${this.root}/${this.url}/register`,
            data: info,
        })
        return data
    }
}

class Home {
    private root: string = 'http://localhost:5020/api/Home'
    private url: string = 'DeleteProducts'
    constructor(url: string) {
        this.url = url
    }

    public deleteToke = async (form: IHomeID | undefined ) => {
        const { data } = await axios({
            method: 'delete',
            url: `${this.root}/${this.url}`,
            data: form,
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`
            }
        })
        return data
    }
}

export const ListGet = {
    menuDinamic: new Menu<IEcommerse['imenuDinamic']>('Menu'),
    usuario: new Menu<IEcommerse['registerResponse']>('Usuario'),
    home: new Menu<IEcommerse['home']>('Home/GetHome'),
    sesion: new Sesion('Usuario'),
    homeDelete: new Home('DeleteProducts')
}
