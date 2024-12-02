import { type SetStateAction, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

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
type AccessoryArray = { id: number; name: string; slug: string }[];

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes
  const cupcakes = useLoaderData() as CupcakeArray;

  const [cakes, setCakes] = useState<AccessoryArray>([]);
  const [choose, setChoose] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => setCakes(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredCupcakes = choose
    ? cupcakes.filter((cupcake) => cupcake.accessory_id === choose)
    : cupcakes;
  const handleClick = (e: { target: { value: SetStateAction<string> } }) =>
    setChoose(e.target.value);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by {/* Step 4: add an option for each accessory */}
          <select id="cupcake-select" onChange={handleClick}>
            <option value="">---</option>
            {cakes.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupcakes.map((a) => (
          <li className="cupcake-item" key={a.id}>
            <Cupcake data={a} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
