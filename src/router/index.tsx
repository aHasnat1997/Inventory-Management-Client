import App from "@/App";
import DemoPage from "@/pages/DemoPage";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import routeGenerator from "@/utils/routeGenerator";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routeGenerator()
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/edit-product',
        element: <DemoPage />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])


export default router;