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
    path: "/admin/user/details",
    element: <UserDetails />,
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
