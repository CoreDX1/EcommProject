import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export const Navibar = (): JSX.Element => {
  const rol = useAuth().login?.usuarioApi.rol.includes("admin") as boolean;
  return (
    <div>
      {rol ? (
        <Link to="/admin">Admin</Link>
      ) : (
        <Link to={"/loginUsuario"}>Usuario</Link>
      )}
    </div>
  );
};
