import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Components/Layout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import Bookings from "./Components/Pages/Bookings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [{ path: "/",
       element: <Home /> 
      },
      { path: "bookings",
        element: <Bookings />,}
      ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-center"/>
     
      <RouterProvider router={router} />
    
  </StrictMode>
);
