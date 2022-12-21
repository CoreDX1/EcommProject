import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export const Edit = (): JSX.Element => {
    const { id } = useParams();
    const idurl = id?.split('-')[0];
    const { home } = useAuth();
    const product = home.find(item => item.id_home === Number(idurl));
    console.log(product);
    return (
        <>
            <h1>Edit</h1>
        </>
    );
};
