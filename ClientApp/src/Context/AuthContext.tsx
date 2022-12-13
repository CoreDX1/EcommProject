import {createContext, useState} from 'react';
import { User } from '../App';

interface Prop{
  children: JSX.Element | JSX.Element[]
}

type AuthContextType = {
  user: User | null,
  signIn: (name :string, password : string) => Promise<void>
  signOut: () => Promise<void>
  data : {
    user: User | null,
    setUser: (user : User | null) => void
  }
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({children} : Prop) => {
  const [user, setUser] = useState<User | null>(null)

  const signIn = async (name :string, password : string) => {
    setUser({
      name,
      password
    })
  }
  const signOut = async () => {
    setUser(null)
  }

  const data = {
    user,
    setUser 
  }
  return (
    <AuthContext.Provider value={{user, signIn , signOut, data}}>
      {children}
    </AuthContext.Provider>
  )

}