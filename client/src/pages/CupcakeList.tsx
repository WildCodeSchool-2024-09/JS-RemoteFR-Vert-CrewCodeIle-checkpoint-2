import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */
// const sampleCupcakes = [
//   {
//     id: 10,
//     accessory_id: "4",
//     accessory: "wcs",
//     color1: "blue",
//     color2: "white",
//     color3: "red",
//     name: "France",
//   },
//   {
//     id: 11,
//     accessory_id: "4",
//     accessory: "wcs",
//     color1: "yellow",
//     color2: "red",
//     color3: "black",
//     name: "Germany",
//   },
//   {
//     id: 27,
//     accessory_id: "5",
//     accessory: "christmas-candy",
//     color1: "yellow",
//     color2: "blue",
//     color3: "blue",
//     name: "Sweden",
//   },
// ];

// type CupcakeArray = typeof sampleCupcakes;

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

type CupcakeArray = [
  cupcakes: {
    id: number;
    accessory_id: string;
    accessory: string;
    color1: string;
    color2: string;
    color3: string;
    name: string;
  },
];

type AccessoryArray = {
  id: number;
  name: string;
  slug: string;
}[];

function CupcakeList() {
  // Step 1: get all cupcakes
  const sampleCupcakes: CupcakeArray = useLoaderData() as CupcakeArray;

  // Step 3: get all accessories
  const [accessoryList, setAccessoryList] = useState<AccessoryArray>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => setAccessoryList(data));
  }, []);

  // Step 5: create filter state
  const [selectAccessory, setSelectAccessory] = useState("");
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectAccessory(event.target.value);
  };

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select" onChange={handleOnChange}>
            <option value="accessory">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessoryList.map((a) => (
              <option value={a.name.toLowerCase().replace(" ", "-")} key={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {/* Step 5: filter cupcakes before repeating */}
        {sampleCupcakes
          .filter((a) => a.accessory.includes(selectAccessory))
          .map((cupcake) => (
            <li className="cupcake-item" key={cupcake.id}>
              <Cupcake data={cupcake} />
            </li>
          ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
