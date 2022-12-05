import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Home/Home";
import { Navbar } from "./Components/Navbar/NavBar";
import { Quote } from "./Components/quote";

function App(): JSX.Element {
  return (
    <>
      <Quote />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
