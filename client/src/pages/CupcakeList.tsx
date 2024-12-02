import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";
import type { CupcakeAccessoryType, CupcakeType } from "../lib/definition";

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes

  const data = useLoaderData() as CupcakeType[];

  console.info(data);

  // Step 3: get all accessories

  const [accessories, setAccessories] = useState<CupcakeAccessoryType[] | []>(
    [],
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accessories`)
      .then((response) => response.json())
      .then((data) => setAccessories(data));
  }, []);

  console.info(accessories);

  // Step 5: create filter state
  const [currentAccessory, setCurrentAccessory] = useState<string>("");

  const handleAccessoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentAccessory(e.target.value);
  };

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select" onChange={handleAccessoryChange}>
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessories.length > 0 &&
              accessories.map((a) => (
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
        {data
          .filter((d) => d.accessory.includes(currentAccessory))
          .map((d) => (
            <li className="cupcake-item" key={d.id}>
              <Cupcake data={d} />
            </li>
          ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
