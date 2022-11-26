import "./App.css";
import { Navbar } from "./Components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "./Interface/Ecommerce";

function App() {
  const [get, setGet] = useState<Category[]>([]);

  const Api = async () => {
    const get = await axios.get("http://localhost:5020/api/Products");
    setGet(get.data);
  };

  useEffect(() => {
    Api();
  },[]);
  console.log(get);

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
