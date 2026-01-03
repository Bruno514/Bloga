import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import HomePage from './pages/HomePage/HomePage.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import SignupPage from './pages/SignupPage/SignupPage.jsx'
import authMiddleware from './middleware/authMiddleware.js'
import "./main.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    middleware: [authMiddleware],
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "signup",
    element: <SignupPage/>,
    errorElement: <ErrorPage />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
