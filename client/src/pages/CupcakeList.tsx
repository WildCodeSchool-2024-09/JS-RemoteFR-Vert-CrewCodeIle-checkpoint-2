import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

function CupcakeList() {
  const cupcakes = useLoaderData() as {
    id: number;
    accessory: string;
    color1: string;
    color2: string;
    color3: string;
    name: string;
  }[];

  console.info(cupcakes);
  // Step 3: get all accessories

  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select">
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {cupcakes.map((cupcake) => (
          /* Step 5: filter cupcakes before repeating */
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
