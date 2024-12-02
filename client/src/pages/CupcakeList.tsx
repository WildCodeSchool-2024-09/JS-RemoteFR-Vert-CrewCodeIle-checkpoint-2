import { useLoaderData } from "react-router-dom";

import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";
import { Link } from "react-router-dom";
/* ************************************************************************* */
const sampleCupcakes = [
  {
    id: 10,
    accessory_id: "4",
    accessory: "wcs",
    color1: "blue",
    color2: "white",
    color3: "red",
    name: "France",
  },
  {
    id: 11,
    accessory_id: "4",
    accessory: "wcs",
    color1: "yellow",
    color2: "red",
    color3: "black",
    name: "Germany",
  },
  {
    id: 27,
    accessory_id: "5",
    accessory: "christmas-candy",
    color1: "yellow",
    color2: "blue",
    color3: "blue",
    name: "Sweden",
  },
];

type CupcakeArray = typeof sampleCupcakes;

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes
  const cupcakeData = useLoaderData() as CupcakeArray;
  // Step 3: get all accessories
  type AccessoryArray = { id: number; name: string; slug: string }[];
  const [cupcakeAccessories, setcupcakeAccessories] = useState<AccessoryArray>(
    [],
  );
  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => {
        setcupcakeAccessories(data);
      });
  }, []);
  // Step 5: create filter state
  const [filterCupcake, setFilterCupcake] = useState("");

  const filteredCupcake = filterCupcake
    ? cupcakeData.filter((c) => c.accessory.includes(filterCupcake))
    : cupcakeData;
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by
          <select
            id="cupcake-select"
            value={filterCupcake}
            onChange={(e) => setFilterCupcake(e.target.value)}
          >
            <option value="">---</option>
            {cupcakeAccessories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      {filteredCupcake.map((c) => (
        <Link to={`/cupcakes/${c.id}`} key={c.name}>
          <ul key={c.id} className="cupcake-list" id="cupcake-list">
            {/* Step 2: repeat this block for each cupcake */}

            {/* Step 5: filter cupcakes before repeating */}
            <li className="cupcake-item">
              <Cupcake data={c} />
            </li>
            {/* end of block */}
          </ul>
        </Link>
      ))}
    </>
  );
}

export default CupcakeList;
