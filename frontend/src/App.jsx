import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeProvider from "./theme";
import Login from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
