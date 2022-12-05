import { useEffect, useState } from "react";
import { Category, SubCategory } from "../../Interface/Ecommerce";
import { MenuCategory, MenuSubcategory } from "../../Api/Menu";

import "./Navbar.scss";

export const Navbar = () : JSX.Element => {
    const [get, setGet] = useState<Category[]>([]);
    const [getsub, setSub] = useState<SubCategory[]>([]);

    const GetCategory = async (): Promise<void> => {
        const get = await MenuCategory.getAll();
        setGet(get);
    };

    const GetSubCategory = async (): Promise<void> => {
        const get = await MenuSubcategory.getAll();
        setSub(get);
    };

    useEffect(() : void => {
        GetCategory();
        GetSubCategory();
    }, []);

    const SubMenuID = (id: number): SubCategory[] => {
        const stringID = getsub.filter(
            (x: SubCategory): boolean => x.id_category == id
        );
        return stringID;
    };

    return (
        <header>
            <nav className="menu-bar">
                <div className="menu-1">
                    <h1>LOGO</h1>
                    <ul className="menu">
                        {get.map((item : Category) : JSX.Element => {
                            return (
                                <li className="dropdown" key={item.id_category}>
                                    <a href="">{item.name}</a>
                                    <ul className="dropdown-menu">
                                        {SubMenuID(item.id_category).map((x : SubCategory) : JSX.Element => {
                                            return (
                                                <li key={x.id_sub_category}>
                                                    <a href="">{x.name}</a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="menu-2">
                    <ul>
                        <li>
                            <img src="/magnifying-glass-solid.svg" alt="" />
                            <a href="">Buscar</a>
                        </li>
                        <li>
                            <img src="/cart-shopping-solid.svg" alt="" />
                            <a href="">Items</a>
                        </li>
                        <li>
                            <img src="/user-solid.svg" alt="" />
                            <a href="">Inciar Sesion</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};
