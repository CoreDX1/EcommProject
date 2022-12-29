import { useEffect, useState } from 'react';
import './quote.scss';

const data = [
    'Bienvenido a mi tienda',
    'Aquí encontraras los mejores productos',
    '30% de descuento en todos los productos',
    'Envios gratis a todo el pais',
    'Compra segura',
    'Pago con tarjeta de credito',
    'Pago con tarjeta de debito',
];

export const Quote = () => {
    // Que muestra un mensaje  que no se ramdon, pero que se repita cada 2 segundos
    const [message, setMessage] = useState(data[0]);
    function getMesage() {
        let i = 0;
        const setinterva = setInterval(() => {
            setMessage(data[i]);
            i++;
            if (i === data.length) {
                i = 0;
            }
            return setinterva;
        }, 5000);
    }
    useEffect(() => {
        getMesage();
    }, []);

    return (
        <>
            <div className='barra__content'>
                <div className='barra__content__message'>{message}</div>
            </div>
        </>
    );
};
