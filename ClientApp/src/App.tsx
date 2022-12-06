import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import { Navbar } from "./Components/Navbar/NavBar";
import { Quote } from "./Components/Quote/quote";

function App(): JSX.Element {
  return (
    <>
      <Quote />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
