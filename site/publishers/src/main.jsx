import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./pages/Home/Home.jsx";
import { ErrorPage } from "./pages/Error/Error.jsx";
import { LoginPage } from "./pages/Login/Login.jsx";
import { SignupPage } from "./pages/Signup/Signup.jsx";
import { EditArticlePage } from "./pages/EditArticle/EditArticle.jsx";
import { authMiddleware, profileLoader } from "./middleware/authMiddleware.js";
import "./main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    middleware: [authMiddleware],
    errorElement: <ErrorPage />,
    loader: profileLoader,
  },
  {
    path: "/articles/:postId/edit",
    element: <EditArticlePage />,
    middleware: [authMiddleware],
    errorElement: <ErrorPage />,
    loader: profileLoader,
  },
  {
    path: "/articles/new",
    element: <EditArticlePage />,
    middleware: [authMiddleware],
    errorElement: <ErrorPage />,
    loader: profileLoader,
  },

  {
    path: "login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
