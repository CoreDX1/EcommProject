import { AuthContext } from "../../Context/AuthContext"
import { useContext } from "react"

export const LoginUsuario = (): JSX.Element => {
  const {login} = useContext(AuthContext)
  return (
    <div>
      <h1>Bienvenido {login?.usuarioApi.username}</h1>
    </div>
  )
}