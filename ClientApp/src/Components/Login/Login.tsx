import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./_from.scss";

const DATABASE = {
  username: "christian",
  password: "index",
};

interface ILogin {
  username: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState<ILogin>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidLogin = () => {
    if (username == DATABASE.username && password == DATABASE.password) {
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
