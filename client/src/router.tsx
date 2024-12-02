import App from "./App";

import { createBrowserRouter } from "react-router-dom";
import CupcakeList from "./pages/CupcakeList";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";

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
        loader: () => fetch(`${import.meta.env.VITE_API_URL}`),
      },
    ],
  },
]);
