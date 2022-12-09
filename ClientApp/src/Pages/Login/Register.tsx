import { Form, Formik } from "formik";
import "./_from.scss";
import { useState } from "react";
import { ListGet } from "../../Api/Menu";
import { IEcommerse } from "../../Interface/Ecommerce";

export const Register = (): JSX.Element => {
  const [register, setRegister] = useState<IEcommerse["register"]>();

  return (
    <div>
      <Formik
        initialValues={{ name: "", password: "" }}
        onSubmit={async (value) => {
          try {
            const response = await ListGet.sesion.register(value);
            console.log(response);
            setRegister(response);
          } catch (ex) {}
        }}
      >
        {({ handleChange, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            {register?.success ? <div>{register.message}</div> : <div>{register?.message}</div>}
            <label>Nombre</label>
            <input type="text" name="name" onChange={handleChange} />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <label>Contraseña</label>
            <input type="password" name="password" onChange={handleChange} />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};