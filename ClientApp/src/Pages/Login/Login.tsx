import { Form, Formik } from "formik";
import "./_from.scss";
import { useState } from "react";
import { ListGet } from "../../Api/Menu";
import { IEcommerse } from "../../Interface/Ecommerce";
import { useNavigate } from "react-router-dom";

export const Login = (): JSX.Element => {
  const [login, setLogin] = useState<IEcommerse["login"]>();
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{ name: "", password: "" }}
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
        {({ handleChange, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <label>Nombre</label>
            <input type="text" name="name" onChange={handleChange} />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <label>Contraseña</label>
            <input type="password" name="password" onChange={handleChange} />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Login</button>
            <button type="button" onClick={() => navigate('/register')}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
