import { useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export const SoloProduts = () => {
    const { id } = useParams();
    const idurl = id?.split('-')[0];
    const { home } = useAuth();
    const product = home.find(item => item.id_home === Number(idurl));
    console.log(product);

    return (
        <div>
            <h1>{product?.title}</h1>
            <img src={'Products/' + product?.image} alt='' />
            <h2>{product?.price}</h2>
        </div>
    );
};
