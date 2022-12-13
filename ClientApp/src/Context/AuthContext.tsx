import {createContext, useContext} from 'react';

interface Prop{
  children: JSX.Element | JSX.Element[]
}

interface Sesion{
  signup : Array<{
    email : string,
    password : string
  }>
}

export const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext) as Sesion
  if(!context) throw new Error('There is no context')
  return context
}

export const AuthProvider = ({children}: Prop) => {

  const signup = (email : string , password : string) => {
    console.log(email, password)
  }

  return (
    <AuthContext.Provider value={{signup}}>
      {children}
    </AuthContext.Provider>
  )

}