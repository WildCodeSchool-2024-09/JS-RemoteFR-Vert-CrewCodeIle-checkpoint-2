import { useLoaderData } from "react-router-dom";
type cupcakeList = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

export default function CupcakeDetailsPage() {
  const cupcake = useLoaderData() as cupcakeList;
  return (
    <>
      <h1>{cupcake.name}</h1>

      <h2>{cupcake.accessory}</h2>
      <p>Come from : {cupcake.name}</p>
      <p>{cupcake.color1}</p>
      <p>{cupcake.color2}</p>
      <p>{cupcake.color3}</p>
    </>
  );
}
