import { useEffect, useState } from "react";
import { Category, SubCategory } from "../../Interface/Ecommerce";
import { MenuCategory, MenuSubcategory } from "../../Api/Menu";

import "./Navbar.scss";

export const Navbar = () => {
  const [get, setGet] = useState<Category[]>([]);
  const [getSub, setSub] = useState<SubCategory[]>([]);

  const GetCategory = async () => {
    const get = await MenuCategory.getAll();
    setGet(get);
  };

  const GetSub = async () => {
    const get = await MenuSubcategory.getAll();
    setSub(get);
  };


  useEffect(() => {
    GetCategory();
      GetSub()
  }, []);
    console.log(getSub)

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
