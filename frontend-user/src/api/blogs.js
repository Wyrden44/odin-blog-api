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