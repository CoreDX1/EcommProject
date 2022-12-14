import { createContext, useContext, useEffect, useState } from 'react'
import { IEcommerse } from '../Interface/Ecommerce'

interface Prop {
    children: JSX.Element | JSX.Element[]
}

type AuthContextType = {
    login: IEcommerse['loginResponse'] | null
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

    return (
        <AuthContext.Provider value={{ signIn, signOut, login }}>
            {children}
        </AuthContext.Provider>
    )
}
