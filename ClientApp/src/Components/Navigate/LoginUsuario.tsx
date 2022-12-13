import { AuthContext } from "../../Context/AuthContext"
import { useContext } from "react"

export const LoginUsuario = (): JSX.Element => {
  const {user} = useContext(AuthContext)
  console.log(user)
  return (
    <div>
      <h1>{user?.name}</h1>
    </div>
  )
}