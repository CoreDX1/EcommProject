import "./Home.scss";
import "./_cards.scss";

import { IEcommerse } from "../../Interface/Ecommerce";
import { useEffect, useState } from "react";
import { ListGet } from "../../Api/Menu";

export const Home = (): JSX.Element => {
  const [home , setHome] = useState<IEcommerse["home"][]>([]);

  const GetHome = async () => {
    const data = await ListGet.home.getAll();
    setHome(data);
  }

  useEffect(() => {
    GetHome();
  }, []);

  console.log(home);
  
  const renderProduct = (): JSX.Element[] => {
    return home.map((item): JSX.Element => {
      return (
        <ul className="cards" key={item.id_home}>
          <li className="cards__item">
            <div className="card">
              <div className="card__imagen">
                <img src={item.image} />
              </div>
              <div className="card__content">
                <h2 className="card__title">{item.title}</h2>
                <h2 className="card__price">$ {item.price}</h2>
              </div>
            </div>
          </li>
        </ul>
      );
    });
  };

  return (
    <>
      <div className="centro">
        <p>Imagen</p>
      </div>
      <main>
        <h3 className="title">Titulo</h3>
        <div className="product_content">{renderProduct()}</div>
      </main>
    </>
  );
};
