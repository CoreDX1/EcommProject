import { useEffect, useState } from 'react';
import { IEcommerse } from '../../Interface/Ecommerce';
import { ListGet } from '../../Api/Menu';

import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export const Navbar = (): JSX.Element => {
    const [get, setGet] = useState<IEcommerse['imenuDinamic'][]>([]);
    const { signOut, login } = useAuth();

    const GetSubCategory = async (): Promise<void> => {
        const get = await ListGet.menuDinamic.getAll();
        setGet(get);
    };

    const test = (): JSX.Element | null => {
        if (login?.usuarioApi.rol.includes('admin')) {
            return <Link className='rol admin' to='/admin'>Admin</Link>;
        }
        if (login?.usuarioApi.rol.includes('empleado')) {
            return <Link className='rol empleado' to={'/loginUsuario'}>Empleado</Link>;
        }
        return null;
    };

    useEffect((): void => {
        GetSubCategory();
    }, []);

    return (
        <header>
            <nav className='menu-bar'>
                <div className='menu-1'>
                    <Link className='menu__logo' to='/'>
                        logo
                    </Link>
                    <ul className='menu'>
                        {get.map(
                            (item) => {
                                return (
                                    <li
                                        className='dropdown'
                                        key={item.id_category}>
                                        <a>{item.name}</a>
                                        <ul className='dropdown-menu'>
                                            {item.submenu.map(
                                                (x, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link to={item.name + '/' + x} 
                                                            >{x}</Link>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                    {test()}
                </div>

                {/* Menu Right */}
                <nav>
                    <ul className='nav'>
                        <li className='nav__item'>
                            <img
                                className='nav__logo'
                                src='/magnifying-glass-solid.svg'
                                alt=''
                            />
                            <a className='nav__link' href=''>
                                Buscar
                            </a>
                        </li>
                        <li className='nav__item'>
                            <img
                                className='nav__logo'
                                src='/cart-shopping-solid.svg'
                                alt=''
                            />
                            <a className='nav__link' href=''>
                                Items
                            </a>
                        </li>
                        {login ? (
                            <button
                                className='nav__signout'
                                onClick={() => signOut()}>
                                Cerrar Sesion
                            </button>
                        ) : (
                            <li className='nav__item nav__item--active'>
                                <img
                                    className='nav__logo'
                                    src='/user-solid.svg'
                                    alt=''
                                />
                                <Link className='nav__link' to='/login'>
                                    Inciar Sesion
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </nav>
        </header>
    );
};
