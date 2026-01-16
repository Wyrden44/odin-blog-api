import { API_URL } from "../config/config";

export async function getAllBlogs(token) {
    const res = await fetch(
        API_URL + "blogs",
        {
            headers: { Authorization: "Bearer " + token },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();

    console.log(data);

    return data;
}

export async function deleteBlog(id, token) {
    const res = await fetch(
        API_URL + "blogs/" + id,
        {
            headers: { Authorization: "Bearer " + token },
            method: "DELETE"
        }
    );

    const data = await res.json();

    if (!res.ok) {
        return {ok: res.ok, errors: data.errors};
    }

    return {ok: res.ok};
}