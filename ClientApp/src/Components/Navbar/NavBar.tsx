import { useEffect, useState } from "react";
import { IMenuDinamic } from "../../Interface/Ecommerce";
import { MenuDinamic } from "../../Api/Menu";

import "./Navbar.scss";

export const Navbar = (): JSX.Element => {
  const [get, setGet] = useState<IMenuDinamic[]>([]);

  const GetSubCategory = async (): Promise<void> => {
    const get = await MenuDinamic.getAll();
    setGet(get);
  };

  useEffect((): void => {
    GetSubCategory();
  }, []);

  return (
    <header>
      <nav className="menu-bar">
        <div className="menu-1">
          <a className="menu__logo" href="/">
            logo
          </a>
          <ul className="menu">
            {get.map((item: IMenuDinamic): JSX.Element => {
              return (
                <li className="dropdown" key={item.id_category}>
                  <a href="">{item.name}</a>
                  <ul className="dropdown-menu">
                    {item.submenu.map((x, index) => {
                      return (
                        <li key={index}>
                          <a href="">{x}</a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Menu Right */}
        <nav>
          <ul className="nav">
            <li className="nav__item">
              <img
                className="nav__logo"
                src="/magnifying-glass-solid.svg"
                alt=""
              />
              <a className="nav__link" href="">
                Buscar
              </a>
            </li>
            <li className="nav__item">
              <img
                className="nav__logo"
                src="/cart-shopping-solid.svg"
                alt=""
              />
              <a className="nav__link" href="">
                Items
              </a>
            </li>
            <li className="nav__item nav__item--active">
              <img className="nav__logo" src="/user-solid.svg" alt="" />
              <a className="nav__link" href="/login">
                Inciar Sesion
              </a>
            </li>
          </ul>
        </nav>
      </nav>
    </header>
  );
};
