import { API_URL } from "../config/api";

export async function loginUser(username, password) {
    const res = await fetch(
        API_URL + "signup",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        return {ok: res.ok, errors: data.errors}
    }

    return {ok: res.ok, id: data.id}
}