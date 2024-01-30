
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import HomePage from "../Pages/HomePage/HomePage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
          path: "/",
          element:<HomePage></HomePage>,
        }
      ]
    },
    {
      path:'*',
      element:<ErrorPage></ErrorPage>,
    },
  ]);