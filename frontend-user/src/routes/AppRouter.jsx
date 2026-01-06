import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Blogs from '../pages/Blogs.jsx'
import App from "../App.jsx"
import Blog from "../pages/Blog.jsx"
import Login from "../pages/Login.jsx"
import Signup from "../pages/Signup.jsx"
import Logout from "../components/Logout.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "blogs", Component: Blogs },
      { path: "blogs/:id", Component: Blog },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "logout", Component: Logout}
    ]
  }
])

export const AppRouter = () => (
    <RouterProvider router={router} />
)