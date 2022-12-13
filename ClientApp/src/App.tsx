import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Navbar } from "./Components/Navbar/NavBar";
import { Quote } from "./Components/Quote/quote";
import { NotFound } from "./Pages/NotFound";
import { Register } from "./Pages/Login/Register";
import { Admin } from "./Admin/Admin";
import { AuthProvider } from "./Context/AuthContext";

function App(): JSX.Element {
  return (
    <>
      <Quote />
      <Navbar />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
