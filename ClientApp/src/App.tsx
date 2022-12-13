import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Navbar } from "./Components/Navbar/NavBar";
import { Quote } from "./Components/Quote/quote";
import { NotFound } from "./Pages/NotFound";
import { Register } from "./Pages/Login/Register";
import { Admin } from "./Admin/Admin";
import { Navibar } from "./Components/Navigate/Navigate";
import { useContext, useEffect} from "react";
import { AuthContext } from "./Context/AuthContext";
import { LoginUsuario } from "./Components/Navigate/LoginUsuario";


export interface User{
  password : string,
  name : string
}

function App(): JSX.Element {
  const {user,signIn , signOut} = useContext(AuthContext)
  console.log(user)

  return (
    <>
      <Quote />
      <Navbar />
        <Navibar/>
        {!user ? <h1>Usuario no logueado</h1> : <h1>Usuario logueado</h1>}
        {user ? <button onClick={signOut}>Cerrar sesión</button> : <button onClick={() => signIn("admin", "admin")}>Iniciar sesión</button> }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginUsuario" element={<LoginUsuario />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin usuario={user}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
