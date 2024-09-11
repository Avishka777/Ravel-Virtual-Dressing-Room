import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import ThemeProvider from "./theme";
import store from "./app/store";
import Home from "./pages/Home/Home";
import Layout from "./component/Layout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import UserDetails from "./pages/Admin/UserDetails";
import ClothingDetails from "./pages/Admin/ClothingDetails";
import ClothesCustomize from "./pages/Customize/ClothesCustomize";
import axios from "axios"
import CreateProduct from "./pages/Admin/CreateProduct";
import MainDashboard from "./pages/Admin/MainDashboard";
import UpdateProduct from "./pages/Admin/UpdateProduct";



axios.defaults.withCredentials = true;


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "/clothes/customize",
        element: <ClothesCustomize />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <MainDashboard />,
  },
  {
    path: "/admin/user/details",
    element: <UserDetails />,
  },
  {
    path: "/admin/clothing/create",
    element: <CreateProduct />,
  },
  {
    path: "/admin/clothing/update/:productId",
    element: <UpdateProduct />,
  },
  {
    path: "/admin/clothing/details",
    element: <ClothingDetails />,
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
