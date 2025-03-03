import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Components/Layout.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Pages/Home.jsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [{ path: "/", element: <Home /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster position="top-center"/>
     
      <RouterProvider router={router} />
    
  </StrictMode>
);
