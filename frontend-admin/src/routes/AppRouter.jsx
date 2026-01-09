import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import App from "../App";
import Blogs from "../pages/Blogs";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {index: true, loader: async () => redirect("/admin")},
        {path: "admin", loader: async () => redirect("/admin/blogs")},
        {path: "admin/blogs", Component: Blogs},
        {path: "admin/blogs/:id", Component: Blog},
        {path: "admin/login", Component: Login},
        {path: "admin/logout", Component: Logout}
    ]
}]);

export default function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}