import { Navigate } from "react-router-dom";
import {  useAuth } from "../Context/AuthContext";

export const Admin = (): JSX.Element => {
  const { login } = useAuth();
  const rol = login?.usuarioApi.rol.includes("admin") as boolean;

  if (!rol) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div>
        <h1>Admin</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
      </div>
    </>
  );
};
