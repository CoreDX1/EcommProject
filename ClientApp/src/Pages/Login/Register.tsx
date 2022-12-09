import { Field, Form, Formik } from "formik";
 import * as Yup from 'yup';
import "./_from.scss";
import { useState } from "react";
import { ListGet } from "../../Api/Menu";
import { IEcommerse } from "../../Interface/Ecommerce";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
  .min(2, "Es muy corto el nombre")
  .max(20, "Es muy largo el nombre")
  .required("Required"),
  password: Yup.string()
  .min(5, "Es muy corto la contraseña")
  .max(20, "Es muy larga la contraseña")
  .required("Required"),
})

export const Register = (): JSX.Element => {
  const [register, setRegister] = useState<IEcommerse["register"]>();

  return (
    <div>
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
          <Form onSubmit={handleSubmit}>
            {register?.success ? <div>{register.message}</div> : <div>{register?.message}</div>}
            <label>Nombre</label>
            <Field type="text" name="name" onChange={handleChange} />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <label>Contraseña</label>
            <Field type="password" name="password" onChange={handleChange} />
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