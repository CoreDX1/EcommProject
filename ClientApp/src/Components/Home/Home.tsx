import "./Home.scss";
import dataJson from "./products.json";

interface Product {
  id: number;
  name: string;
  price: number;
  pathImange: string;
}

export const Home = (): JSX.Element => {
  const renderProduct = (): JSX.Element[] => {
    return dataJson.map((item: Product): JSX.Element => {
      return (
        <ul className="cards" key={item.id}>
          <li className="cards_item">
            <div className="card">
              <div className="card_imagen">
                <img src={item.pathImange} />
              </div>
              <div className="card_content">
                <h2 className="card_title">{item.name}</h2>
                <h2 className="card_price">{item.price}</h2>
                <button className="card_button">Buy</button>
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
        <h1>
          Titulo
          {renderProduct()}
        </h1>
      </main>
    </>
  );
};
