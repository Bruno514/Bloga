import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router' 
import HomePage from './pages/HomePage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import authMiddleware from './middleware/authMiddleware.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    middleware: [authMiddleware],
    errorElement: <ErrorPage/>
  },
  {
    path: "login",
    element: <LoginPage/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
