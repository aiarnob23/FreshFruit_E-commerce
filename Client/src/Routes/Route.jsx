
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import HomePage from "../Pages/HomePage/HomePage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AllProducts from "../Pages/AllProducts/AllProducts";
import SearchProduct from "../Pages/SearchPage/SearchProduct";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
          path: "/",
          element:<HomePage></HomePage>,
        },
        {
          path: "/products",
          element:<AllProducts></AllProducts>,
        },
        {
          path: "/search",
          element:<SearchProduct></SearchProduct>,
        },
      ]
    },
    {
      path:'*',
      element:<ErrorPage></ErrorPage>,
    },
  ]);