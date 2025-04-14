import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About, Auth, Contact, Dashboard, Home } from "./pages";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { GoogleLoginsuccess, LoginForm, RegisterForm } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "login/success",
        element: <GoogleLoginsuccess />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>
);
