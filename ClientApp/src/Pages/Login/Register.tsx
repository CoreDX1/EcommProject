import { Field, Form, Formik } from "formik";
 import * as Yup from 'yup';
import "./_register.scss";
import { useState } from "react";
import { ListGet } from "../../Api/Menu";
import { IEcommerse } from "../../Interface/Ecommerce";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
  .min(2, "Minimo de 2 caracteres")
  .max(20, "Maximo de 20 caracteres")
  .required("Required"),
  password: Yup.string()
  .min(5, "Minimo de 5 caracteres")
  .max(20, "Maximo de 20 caracteres")
  .required("Required"),
})

export const Register = (): JSX.Element => {
  const [register, setRegister] = useState<IEcommerse["register"]>();

  return (
    <div className="register">
      <h1 className="register__title">Registrarse</h1>
      <Formik
        initialValues={{ name: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (value) => {
          try {
            const response = await ListGet.sesion.register(value);
            console.log(response);
            setRegister(response);
          } catch (ex) {}
        }}
      >
        {({ handleChange, handleSubmit, errors, touched }) => (
          <Form className="register__form" onSubmit={handleSubmit}>
            {register?.success ? <div className="register__result">{register.message}</div> : <div className="register__result">{register?.message}</div>}
            <label>Nombre</label>
            {errors.name && touched.name ? <div className="register__error">{errors.name}</div> : null}
            <Field type="text" name="name" onChange={handleChange} />
            <label>Contraseña</label>
            {errors.password && touched.password ? (
              <div className="register__erro">{errors.password}</div>
            ) : null}
            <Field type="password" name="password" onChange={handleChange} />
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};