import { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import type { accessoriesType } from "../assets/lib/definitions";
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

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */
const API_ACCESSORIES = import.meta.env.VITE_API_URL_ACCESSORIES;

function CupcakeList() {
  // Step 1: get all cupcakes
  const cupcakesList = useLoaderData() as CupcakeArray;

  // Step 3: get all accessories
  const [accessories, setAccessories] = useState<accessoriesType[] | null>();

  useEffect(() => {
    fetch(API_ACCESSORIES)
      .then((response) => response.json())
      .then((data) => setAccessories(data));
  }, []);
  const accessoriesList = accessories as accessoriesType[];
  // Step 5: create filter state
  const [filterList, setFilterList] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterList(e.target.value);
  };

  const cupcakesListFiltred = cupcakesList.filter(
    (c) => c.accessory === filterList,
  );
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select
            id="cupcake-select"
            onChange={handleChange}
            value={filterList}
          >
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessories &&
              accessoriesList.map((a) => (
                <option value={a.slug} key={a.id}>
                  {a.name}
                </option>
              ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {/* Step 5: filter cupcakes before repeating */}
        {cupcakesListFiltred.map((c) => (
          <NavLink to={`/cupcakes/${c.id}`} key={c.id}>
            <li className="cupcake-item" key={c.id}>
              <Cupcake data={c} />
            </li>
          </NavLink>
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
