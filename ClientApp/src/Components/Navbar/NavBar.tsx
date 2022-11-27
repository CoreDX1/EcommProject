import { useEffect, useState } from "react";
import { Category } from "../../Interface/Ecommerce";
import { MenuCategory } from "../../Api/Menu";

import "./Navbar.scss";

export const Navbar = () => {
  const [get, setGet] = useState<Category[]>([]);

  const Api = async () => {
    const get = await MenuCategory.getAll();
    setGet(get);
  };

  useEffect(() => {
    Api();
  }, []);

  const Menu = () => {
    return get.map((item) => {
      return (
        <li className="link" key={item.id_category}>
          <a href="">{item.name}</a>
        </li>
      );
    });
  };

  return (
    <div>
      <header>
        <nav>
          <div className="Navbar">
            <div className="Navbar-logo">
              <h2>
                <span>Logo</span>
              </h2>
            </div>
            <ul className="links">{Menu()}</ul>
          </div>
        </nav>
      </header>
    </div>
  );
};
