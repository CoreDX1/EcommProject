import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

interface iProps{
    redirectTo: string;
}

export const ProtectedRoute = ({redirectTo}: iProps) => {
    const { login } = useAuth();
    const rol = !!login?.usuarioApi.rol.includes('admin');
    if (!rol) {
        return <Navigate to={redirectTo} />;
    }
    return <Outlet />;
};
