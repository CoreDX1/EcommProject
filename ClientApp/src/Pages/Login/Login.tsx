import { Field, Form, Formik } from "formik";
import "./_from.scss";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { ListGet } from "../../Api/Menu";
import { IEcommerse } from "../../Interface/Ecommerce";

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(4, "Es muy corto").max(30, "Es muy largo").required(),
  password: Yup.string()
    .min(2, "La contraseña es corta")
    .max(20, "La contraseña es larga")
    .required(),
});
interface IUsuario {
  name: string;
  password: string;
}

const IsValid = () => {};

export const Login = (): JSX.Element => {
  const [user, setUser] = useState<IEcommerse["usuario"][]>([]);

  const [login, setLogin] = useState<IUsuario>();

  const GetUsuarios = async () => {
    const date = await ListGet.usuario.getAll();
    setUser(date);
  };

  useEffect(() => {
    GetUsuarios();
  }, []);

  console.log(user);
  return (
    <div>
      <Formik
        initialValues={{ name: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(value) => {
          setLogin(value);
          console.log(login);
        }}
      >
        {({handleChange, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <label>Nombre</label>
            <Field name="name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <label>Contraseña</label>
            <Field name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
