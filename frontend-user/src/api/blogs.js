import { API_URL } from "../config/api";

export async function fetchBlogs(token) {
    const res = await fetch(
        API_URL + "blogs",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
        return [];
    }

    const data = await res.json();
    return data;
}

export async function fetchBlog(token, id) {
    const res = await fetch(
        API_URL + "blogs/" + id,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch blog");
        return null;
    }

    const data = await res.json();
    return data;
}