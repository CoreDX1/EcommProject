import { Form, Formik } from "formik";
import "./_from.scss";
import { useState } from "react";
import { ListGet } from "../../Api/Menu";
import { IEcommerse } from "../../Interface/Ecommerce";
import { useNavigate } from "react-router-dom";

export const Login = (): JSX.Element => {
  const [login, setLogin] = useState<IEcommerse["loginResponse"]>();
  const navigate = useNavigate();

  return (
    <div className="form">
      <h1 className="form__title">Inciar Sesion</h1>
      <Formik 
        initialValues={{ email: "", password: "" }}
        onSubmit={async (value) => {
          try {
            const response = await ListGet.sesion.login(value);
            setLogin(response);
            if (response.success) {
              navigate("/");
            }
          } catch (ex) {}
        }}
      >
        {({ handleChange, handleSubmit}) => (
          <Form className="form__form" onSubmit={handleSubmit}>
            <label>Correo Electronico</label>
            <input type="email" name="email" onChange={handleChange} />
            <label>Contraseña</label>
            <input type="password" name="password" onChange={handleChange} />
            <button type="submit">Login</button>
            <button type="button" onClick={() => navigate('/register')}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
