import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

type CupcakeData = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

type AccessoryArray = {
  id: number;
  name: string;
  slug: string;
};

/* ************************************************************************* */
// const sampleCupcakes = [
// 	{
// 		id: 10,
// 		accessory_id: "4",
// 		accessory: "wcs",
// 		color1: "blue",
// 		color2: "white",
// 		color3: "red",
// 		name: "France",
// 	},
// 	{
// 		id: 11,
// 		accessory_id: "4",
// 		accessory: "wcs",
// 		color1: "yellow",
// 		color2: "red",
// 		color3: "black",
// 		name: "Germany",
// 	},
// 	{
// 		id: 27,
// 		accessory_id: "5",
// 		accessory: "christmas-candy",
// 		color1: "yellow",
// 		color2: "blue",
// 		color3: "blue",
// 		name: "Sweden",
// 	},
// ];

// type CupcakeArray = typeof sampleCupcakes;

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes
  const cupcakes = useLoaderData() as CupcakeData[];
  console.log(cupcakes);

  // Step 3: get all accessories
  const [accessories, setAccessories] = useState<AccessoryArray[]>([]);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/accessories");
        if (!response.ok) {
          throw new Error("Failed to fetch accessories");
        }
        const data = await response.json();
        setAccessories(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccessories();
  }, []);

  // Step 5: create filter state

  const [selectedAccessory, setSelectedAccessory] = useState<string>("");
  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory_id === selectedAccessory)
    : cupcakes;

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={(e) => setSelectedAccessory(e.target.value)}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupcakes.map((cupcake) => (
          <li className="cupcake-item" key={cupcake.id}>
            <Link to={`/cupcakes/${cupcake.id}`}>
              <Cupcake data={cupcake} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
