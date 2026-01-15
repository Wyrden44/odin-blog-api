import { API_URL } from "../config/config";

export async function getAllBlogs(token) {
    const res = await fetch(
        API_URL + "blogs",
        {
            headers: { Authorization: "Bearer " + token }
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();

    console.log(data);

    return data;
}