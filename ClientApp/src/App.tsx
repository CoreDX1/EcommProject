import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Navbar } from "./Components/Navbar/NavBar";
import { Quote } from "./Components/Quote/quote";
import { NotFound } from "./Pages/NotFound";
import { Register } from "./Pages/Login/Register";

function App(): JSX.Element {
  return (
    <>
      <Quote />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
