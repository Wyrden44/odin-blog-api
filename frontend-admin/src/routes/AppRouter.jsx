import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import App from "../App";
import Blogs from "../pages/Blogs";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

const router = createBrowserRouter({
    path: "/",
    element: <App />,
    children: [
        {index: true, loader: async () => redirect("/blogs")},
        {path: "blogs", Component: Blogs},
        {path:  "blogs/:id", Component: Blog},
        {path: "login", Component: Login},
        {path: "logout", Component: Logout}
    ]
});

export default function AppRouter() {
    return (
        <RouterProvider router={router} />
    )
}