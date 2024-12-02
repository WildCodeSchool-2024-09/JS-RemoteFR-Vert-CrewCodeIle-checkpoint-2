import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cupcake from "../components/Cupcake";

interface CupcakeData {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
}

function CupcakeDetails() {
  const { id } = useParams<{ id: string }>();
  const [cupcake, setCupcake] = useState<CupcakeData | null>(null);

  useEffect(() => {
    const fetchCupcakeDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/cupcakes/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cupcake details");
        }
        const data = await response.json();
        setCupcake(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCupcakeDetails();
  }, [id]);

  if (!cupcake) {
    return <div>No Cupcakes for the moment</div>;
  }

  return (
    <div>
      <h1>{cupcake.name}</h1>
      <Cupcake data={cupcake} />
      <p>Accessory: {cupcake.accessory}</p>
      <p>
        Colors: {cupcake.color1}, {cupcake.color2}, {cupcake.color3}
      </p>
    </div>
  );
}

export default CupcakeDetails;
