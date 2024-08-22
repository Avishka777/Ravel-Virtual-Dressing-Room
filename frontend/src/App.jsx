import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import ThemeProvider from "./theme";
import store from "./app/store";
import Home from "./pages/Home/Home";
import Layout from "./component/Layout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
