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
    ],
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
