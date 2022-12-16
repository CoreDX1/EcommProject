import axios from 'axios';
import {
    CategoryApi,
    IEcommerse,
    IHomeID,
    ISesion,
    ISesionAuth,
} from '../Interface/Ecommerce';

class Menu<T> implements CategoryApi<T> {
    private root: string = 'http://localhost:5020/api';
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public getAll = async () => {
        const { data } = await axios.get<T[]>(`${this.root}/${this.url}`);
        return data;
    };

    public post = async (info: ISesionAuth['loginResponse']): Promise<T> => {
        const { data } = await axios({
            method: 'post',
            url: `${this.root}/${this.url}/token`,
            data: info,
        });
        return data;
    };
}

class Home {
    private root: string = 'http://localhost:5020/api/Home';
    private url: string = 'DeleteProducts';
    constructor(url: string) {
        this.url = url;
    }

    public post = async (info: IEcommerse['postHome']) => {
        const { data } = await axios({
            method: 'post',
            url: `${this.root}/${this.url}/InsertProducts`,
            data: info,
        });
        return data;
    };

    public deleteToke = async (form: IHomeID | undefined) => {
        const { data } = await axios({
            method: 'delete',
            url: `${this.root}/${this.url}`,
            headers: {
                responseType: 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
            data: form,
        });
        return data;
    };
}
class Sesion<T, U> implements ISesion<T, U> {
    private root: string = 'http://localhost:5020/api';
    private url: string = 'Usuario';
    constructor(url: string) {
        this.url = url;
    }

    public login = async (info: T): Promise<U> => {
        const { data } = await axios({
            method: 'post',
            url: `${this.root}/${this.url}/token`,
            data: info,
        });
        return data;
    };

    public register = async (info: T): Promise<U> => {
        const { data } = await axios({
            method: 'post',
            url: `${this.root}/${this.url}/register`,
            data: info,
        });
        return data;
    };
}


export const ListGet = {
    menuDinamic: new Menu<IEcommerse['imenuDinamic']>('Menu'),
    usuario: new Menu<ISesionAuth['registerResponse']>('Usuario'),
    home: new Menu<IEcommerse['home']>('Home/GetHome'),

    login: new Sesion<ISesionAuth['loginRequest'], ISesionAuth['loginResponse']>
        ('Usuario'),
    register: new Sesion<ISesionAuth['registerRequest'],
        ISesionAuth['registerResponse']>('Usuario'),

    homeDelete: new Home('DeleteProducts'),
    postHome: new Home('InsertProducts'),
};
