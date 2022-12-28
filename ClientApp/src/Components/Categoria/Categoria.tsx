import './message.scss'

import { useParams } from 'react-router-dom';

export const Categoria = () => {
    const { categoria, subcategoria } = useParams();
    return <div className='message'>
        <h1 className='texto'>Categoria: {categoria + '-' + subcategoria}</h1>
    </div>
};
