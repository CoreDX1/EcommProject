import { Component, ReactNode } from "react";
import { Category, SubCategory } from "../../Interface/Ecommerce";
import { MenuCategory, MenuSubcategory } from "../../Api/Menu";

import "./Navbar.scss";

type NavbarProps = {};

type NavbarState = {
  categories: Category[];
  subcategories: SubCategory[];
};

export class Navbar extends Component<NavbarProps, NavbarState> {
  state = {
    categories: [],
    subcategories: [],
  };

  async componentDidMount() {
    const categories = await MenuCategory.getAll();
    const subcategories = await MenuSubcategory.getAll();

    this.setState({ categories, subcategories });
  }

  SubMenuID = (id: number): SubCategory[] => {
    return this.state.subcategories.filter(
      (x: SubCategory): boolean => x.id_category === id
    );
  };

  render(): ReactNode {
    return (
      <header>
        <nav className="menu-bar">
          <div className="menu-1">
            <a className="menu__logo" href="/">Logo</a>
            <ul className="menu">
              {this.state.categories.map((item: Category): JSX.Element => {
                return (
                  <li className="dropdown" key={item.id_category}>
                    <a href="">{item.name}</a>
                    <ul className="dropdown-menu">
                      {this.SubMenuID(item.id_category).map(
                        (x: SubCategory): JSX.Element => {
                          return (
                            <li key={x.id_sub_category}>
                              <a href="">{x.name}</a>
                            </li>
                          );
                        }
                      )}
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
                <a className="nav__link" href="">
                  Inciar Sesion
                </a>
              </li>
            </ul>
          </nav>
        </nav>
      </header>
    );
  }
}
