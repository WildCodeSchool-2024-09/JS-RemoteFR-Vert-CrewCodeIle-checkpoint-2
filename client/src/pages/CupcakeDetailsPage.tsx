import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";
import type { CupcakeType } from "../lib/definition";

export default function CupcakeDetailsPage() {
  const cupcake = useLoaderData() as CupcakeType;

  console.info(cupcake);

  return <Cupcake data={cupcake} />;
}
