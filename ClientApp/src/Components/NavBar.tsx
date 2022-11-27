import { useEffect, useState } from "react";
import { Category } from "../Interface/Ecommerce";
import { MenuApi } from "../Api/Menu";

export const Navbar = () => {
  const [get, setGet] = useState<Category[]>([]);

  const Api = async () => {
    const get = await MenuApi.Category();
    setGet(get);
  };

  useEffect(() => {
    Api();
  }, []);

  const render = () => {
    return get.map((item) => {
      return (
        <div key={item.id_category}>
          <p>{item.name}</p>
        </div>
      );
    });
  };
  return <div>{render()}</div>;
};
