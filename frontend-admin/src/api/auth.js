import { API_URL } from "../../../frontend-user/src/config/api";

export async function loginAdmin(password) {
    const res = await fetch(
        API_URL + "login",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({password})
        }
    );

    const data = await res.json();

    console.log(data, res.status);

    if (!res.ok) {
        return {ok: res.ok, errors: res.errors}
    }

    return {ok: res.ok, token: data.token}
}