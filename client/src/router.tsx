import App from "./App";

import { createBrowserRouter } from "react-router-dom";
import CupcakeList from "./pages/CupcakeList";
import CupcakesDetails from "./pages/CupcakesDetails";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";

const API_URL = import.meta.env.VITE_API_URL;
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructions",
        element: <Instructions />,
      },
      {
        path: "/cupcakes",
        element: <CupcakeList />,
        loader: () => fetch(`${API_URL}`),
      },
      {
        path: "/cupcakes/:id",
        element: <CupcakesDetails />,
        loader: ({ params }) => fetch(`${API_URL}/${params.id}`),
      },
    ],
  },
]);
