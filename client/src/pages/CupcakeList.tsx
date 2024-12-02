import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

type CupcakeData = {
  id: number;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

type AccessoryArray = { id: number; name: string; slug: string }[];

function CupcakeList() {
  const cupcakes = useLoaderData() as CupcakeData[];

  const [accessories, setAccessories] = useState<AccessoryArray>([]);
  const [selectedAccessory, setSelectedAccessory] = useState<string>("");

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/accessories");
        if (!response.ok) {
          throw new Error("Failed to fetch accessories");
        }
        const data: AccessoryArray = await response.json();
        setAccessories(data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };

    fetchAccessories();
  }, []);

  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory === selectedAccessory)
    : cupcakes;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccessory(event.target.value);
  };

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={handleSelectChange}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.slug}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
