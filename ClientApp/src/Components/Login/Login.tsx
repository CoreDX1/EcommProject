import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListGet } from "../../Api/Menu";
import { IEcommerse } from "../../Interface/Ecommerce";
import "./_from.scss";

const DATABASE = [
  {
    id: 1,
    username: "christian",
    password: "index",
  },
];

interface ILogin {
  username: string;
  password: string;
}

export const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<IEcommerse["usuario"][]>([]);

  const [login, setLogin] = useState<ILogin>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const GetUser = async (): Promise<void> => {
    const date = await ListGet.usuario.getAll();
    setUsuario(date);
  };

  useEffect(() => {
    GetUser();
  }, []);

  const isValidLogin = () => {
    const verficate = usuario.some(
      (p: IEcommerse["usuario"]): boolean =>
        p.name == username && p.password == password
    );
    if (verficate) {
      return true;
    }
    setError("Error de autenticacion");
    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidLogin()) {
      const enviar: ILogin = {
        username: username,
        password: password,
      };
      setLogin(enviar);
      navigate("/");
    } else {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <form className="form__base" onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <div className="form__text">
          <input
            type="text"
            className="form__input"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label>Username</label>
        </div>
        <div className="form__text">
          <input
            type="password"
            className="form__input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label>Password</label>
        </div>
        <button className="form__button">Login</button>
      </form>
    </div>
  );
};
