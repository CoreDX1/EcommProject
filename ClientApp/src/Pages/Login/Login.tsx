import { Form, Formik } from 'formik'
import './_from.scss'
import { ListGet } from '../../Api/Menu'
import { IEcommerse } from '../../Interface/Ecommerce'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

export const Login = (): JSX.Element => {
    // const [login, setLogin] = useState<IEcommerse["loginResponse"]>();
    const navigate = useNavigate()

    const { login, signIn } = useAuth()

    return (
        <div className="form">
            <h1 className="form__title">Inciar Sesion</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (value) => {
                    try {
                        const response: IEcommerse['loginResponse'] =
                            await ListGet.sesion.login(value)
                        signIn(response)
                        if (response.success) {
                            const rol = response.usuarioApi.rol.includes(
                                'admin'
                            ) as boolean
                            if (rol) {
                                navigate('/admin')
                            } else {
                                navigate('/')
                            }
                        }
                    } catch (ex) {}
                }}
            >
                {({ handleChange, handleSubmit }) => (
                    <Form className="form__form" onSubmit={handleSubmit}>
                        {login ? (
                            <p className="login_error">{login.result}</p>
                        ) : null}
                        <label>Correo Electronico</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                        />
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                        <button type="submit">Login</button>
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
