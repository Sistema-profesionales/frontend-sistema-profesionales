import { BASE_URI_REST_API } from '../constants/base.uri';

export async function getProfessions() {
    try {
        const res = await fetch(`${BASE_URI_REST_API}/professions`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            const data = JSON.parse(await res.text());
            let msg = [];
            for (let k in data) msg = [...msg, ...data[k]];
            throw Object({ status: res.status, message: msg.join("\n") });
        }
        return Promise.resolve(res.json());
    } catch (err) {
        return Promise.reject(err);
    }
}