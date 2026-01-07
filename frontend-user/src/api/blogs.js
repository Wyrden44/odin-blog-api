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

export async function postComment(token, id, content) {
    const res = await fetch(
        API_URL + "blogs/" + id + "/comments",
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({ content })
        }
    );

    if (!res.ok && res.status === 401) {
        return ({ok: res.ok, errors: ["Unauthorized"]});
    }

    const data = await res.json();

    if (!res.ok) {
        return ({ok: res.ok, errors: data.errors});
    }

    return {ok: res.ok, id: data.id};
}