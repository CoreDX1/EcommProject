import "./Home.scss";
import "./_cards.scss";

import dataJson from "./products.json";
import { Component, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  pathImange: string;
}

type HomeProps = {};
type HomeState = {
  products: Product[];
};

export class Home extends Component<HomeProps, HomeState> {
  state = {
    products: dataJson,
  };

  renderProduct = () => {
    return this.state.products.map((item: Product): JSX.Element => {
      return (
        <ul className="cards" key={item.id}>
          <li className="cards__item">
            <div className="card">
              <div className="card__imagen">
                <img src={item.pathImange} />
              </div>
              <div className="card__content">
                <h2 className="card__title">{item.name}</h2>
                <h2 className="card__price">$ {item.price}</h2>
              </div>
            </div>
          </li>
        </ul>
      );
    });
  };

  render(): ReactNode {
    return (
      <>
        <div className="centro">
          <p>Imagen</p>
        </div>
        <main>
          <h3 className="title">Titulo</h3>
          <div className="product_content">{this.renderProduct()}</div>
        </main>
      </>
    );
  }
}
