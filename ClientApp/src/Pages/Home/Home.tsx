import "./Home.scss";
import "./_cards.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export const Home = (): JSX.Element => {
    const { home } = useAuth();

    const renderProduct = (): JSX.Element[] => {
        return home.map((item): JSX.Element => {
            const urldynamic = item.title.replace(/\s/g, "-");
            return (
                <ul className="cards" key={item.id_home}>
                    <li className="cards__item">
                        <div className="card">
                            <div className="card__imagen">
                                <img src={item.image} />
                            </div>
                            <div className="card__content">
                                <h2 className="card__title">{item.title}</h2>
                                <div>
                                    <Link to={`/${item.id_home}-${urldynamic}`}> Ver mas</Link>
                                </div>
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
