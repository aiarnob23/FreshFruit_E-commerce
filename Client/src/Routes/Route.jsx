
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import HomePage from "../Pages/HomePage/HomePage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AllProducts from "../Pages/AllProducts/AllProducts";
import SearchProduct from "../Pages/SearchPage/SearchProduct";
import Register from "../Pages/RegisterPage/Register";
import Cart from "../Pages/CartPage/Cart";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/LoginPage/Login";


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
        {
          path: "/register",
          element:<Register></Register>,
        },
        {
          path: "/login",
          element:<Login></Login>,
        },
        {
          path: "/cart",
          element:<PrivateRoute><Cart></Cart></PrivateRoute>,
        },
      ]
    },
    {
      path:'*',
      element:<ErrorPage></ErrorPage>,
    },
  ]);