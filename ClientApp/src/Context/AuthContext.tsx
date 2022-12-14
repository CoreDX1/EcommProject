import { createContext, useContext, useEffect, useState } from 'react'
import { ListGet } from '../Api/Menu'
import { IEcommerse } from '../Interface/Ecommerce'

interface Prop {
    children: JSX.Element | JSX.Element[]
}

type AuthContextType = {
    login: IEcommerse['loginResponse'] | null
    home : IEcommerse["home"][]
    signIn: (formUser: IEcommerse['loginResponse']) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextType)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}

export const AuthProvider = ({ children }: Prop) => {
    // const [user, setUser] = useState<User | null>(
    // window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")!) : null
    // )
    const [login, setLogin] = useState<IEcommerse['loginResponse'] | null>(
        window.localStorage.getItem('login')
            ? JSON.parse(window.localStorage.getItem('login')!)
            : null
    )
    useEffect(() => {
        const LocalStore = () => {
            try {
                window.localStorage.setItem('login', JSON.stringify(login))
                window.localStorage.setItem('token', login?.result as string)
            } catch (e) {
                console.error(e)
            }
        }
        LocalStore()
    }, [login])

    const signIn = async (formUser: IEcommerse['loginResponse']) => {
        setLogin(formUser)
    }

    const signOut = async () => {
        setLogin(null)
    }

    // Get Products para el home

  const [home , setHome] = useState<IEcommerse["home"][]>([]);

  const GetHome = async () => {
    const data = await ListGet.home.getAll();
    setHome(data);
  }

  useEffect(() => {
    GetHome();
  }, []);

    return (
        <AuthContext.Provider value={{ signIn, signOut, login, home }}>
            {children}
        </AuthContext.Provider>
    )
}
