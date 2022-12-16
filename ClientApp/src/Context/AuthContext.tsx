import { createContext, useContext, useEffect, useState } from 'react';
import { ListGet } from '../Api/Menu';
import { IEcommerse, ISesionAuth } from '../Interface/Ecommerce';

interface Prop {
    children: JSX.Element | JSX.Element[];
}

// Este Type es para el contexto

type AuthContextType = {
    login: ISesionAuth['loginResponse'] | null;
    home: IEcommerse['home'][];
    signIn: (formUser: ISesionAuth['loginResponse']) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

// Este es el Hook para usar el contexto

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

// Este es el Provider
export const AuthProvider = ({ children }: Prop) => {
    const [login, setLogin] = useState<ISesionAuth['loginResponse'] | null>(
        window.localStorage.getItem('login')
            ? JSON.parse(window.localStorage.getItem('login')!)
            : null
    );
    useEffect(() => {
        const LocalStore = () => {
            try {
                window.localStorage.setItem('login', JSON.stringify(login));
                window.localStorage.setItem('token', login?.result as string);
            } catch (e) {
                console.error(e);
            }
        };
        LocalStore();
    }, [login]);


    // Sign In y Sign Out

    const signIn = async (formUser: ISesionAuth['loginResponse']) => {
        setLogin(formUser);
    };

    const signOut = async () => {
        setLogin(null);
    };

    // Get Products para el home

    const [home, setHome] = useState<IEcommerse['home'][]>([]);

    const GetHome = async () => {
        const data = await ListGet.home.getAll();
        setHome(data);
    };

    useEffect(() => {
        GetHome();
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, signOut, login, home }}>
            {children}
        </AuthContext.Provider>
    );
};
