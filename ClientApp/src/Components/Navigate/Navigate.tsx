import { Link } from "react-router-dom"

export const Navibar = (): JSX.Element => {
  return (
    <div>
      <Link to={"/admin"}>Admin</Link>
      <Link to={"/loginUsuario"}>Usuario</Link>
    </div>
  )

}
