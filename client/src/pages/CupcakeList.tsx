import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

type CupcakeArray = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};
type AccessoryArray = { id: number; name: string; slug: string }[];

function CupcakeList() {
  const cupcakeList = useLoaderData() as CupcakeArray[];
  const [accessories, setAccessories] = useState<AccessoryArray>([]);
  const [selectedAccessory, setSelectedAccessory] = useState("");
  const [filteredCupcakes, setFilteredCupcakes] = useState(cupcakeList);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accessories`)
      .then((response) => response.json())
      .then((data: AccessoryArray) => setAccessories(data));
  }, []);
  useEffect(() => {
    if (selectedAccessory === "") {
      setFilteredCupcakes(cupcakeList);
    } else {
      setFilteredCupcakes(
        cupcakeList.filter(
          (cupcake) => cupcake.accessory_id === selectedAccessory,
        ),
      );
    }
  }, [selectedAccessory, cupcakeList]);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={(event) => setSelectedAccessory(event.target.value)}
          >
            <option value=""> </option>
            {accessories.map((accessory) => (
              <option value={accessory.id} key={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupcakes.map((cupcake) => (
          <li className="cupcake-item" key={cupcake.id}>
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
