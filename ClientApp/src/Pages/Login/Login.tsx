import { Form, Formik } from 'formik';
import './_from.scss';
import { ListGet } from '../../Api/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('email invalido').required('Required'),
    password: Yup.string().required('Required'),
});
export const Login = (): JSX.Element => {
    const navigate = useNavigate();
    const { login, signIn } = useAuth();
    return (
        <div className='form'>
            <h1 className='form__title'>Inciar Sesion</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={async value => {
                    try {
                        const response = await ListGet.login.login(value);
                        signIn(response);
                        if (response.success) {
                            const rol = response.usuarioApi.rol.includes(
                                'admin'
                            ) as boolean;
                            if (rol) {
                                navigate('/admin');
                            } else {
                                navigate('/');
                            }
                        }
                    } catch (ex) {
                        console.log('Error' + ex);
                    }
                }}>
                {({ handleChange, handleSubmit }) => (
                    <Form className='form__form' onSubmit={handleSubmit}>
                        {login ? (
                            <p className='login_error'>{login.result}</p>
                        ) : null}
                        <label>Correo Electronico</label>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                        />
                        <label>Contraseña</label>
                        <input
                            type='password'
                            name='password'
                            onChange={handleChange}
                        />
                        <button type='submit'>Login</button>
                        <button
                            type='button'
                            onClick={() => navigate('/register')}>
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
