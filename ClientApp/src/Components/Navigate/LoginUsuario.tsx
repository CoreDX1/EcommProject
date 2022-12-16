import { useAuth } from '../../Context/AuthContext';

export const LoginUsuario = (): JSX.Element => {
    const { login } = useAuth();
    return (
        <div>
            <h1>Bienvenido {login?.usuarioApi.username}</h1>
        </div>
    );
};
