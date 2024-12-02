import { useLoaderData } from "react-router-dom";
import type { cupcakesListType } from "../assets/lib/definitions";
export { useLoaderData } from "react-router-dom";

export default function CupcakesDetails() {
  const cupcake: cupcakesListType = useLoaderData() as cupcakesListType;

  return (
    <div>
      <h1>{cupcake.name}</h1>
      <p>
        its a délicious cupcake {cupcake.color1}, {cupcake.color2} and{" "}
        {cupcake.color3} with {cupcake.accessory}. This cupcake come from{" "}
        {cupcake.name}.
      </p>
    </div>
  );
}
