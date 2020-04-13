import { BASE_URI_REST_API } from '../constants/base.uri';

export function getUserLocalStorage () {
  return JSON.parse(localStorage.getItem("userLogged"));;
}

export async function getInfoUserMinsal(rut) {
  try {
    const res = await fetch(`${BASE_URI_REST_API}/users/getInfo?rut=${rut}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });

    if (!res.ok) {
      const data = JSON.parse(await res.text());
      let msg = [];
      for (let k in data) msg = [...msg, ...data[k]];
      throw Object({ status: res.status, message: msg });
    }
    return Promise.resolve(res.json());
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createUserProfessional(data) {
  try {
    const res = await fetch(`${BASE_URI_REST_API}/users`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const data = JSON.parse(await res.text());
      let msg = [];
      for (let k in data) msg = [...msg, ...data[k]];
      throw Object({ status: res.status, message: msg });
    }
    return Promise.resolve(res.json());
  } catch (error) {
    return Promise.reject(error);
  }
}


export async function getFindProfessionalsByFilters(data) {
  console.log(data);
  try {
    const res = await fetch(`${BASE_URI_REST_API}/users/getUsersByFilters`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const data = JSON.parse(await res.text());
      let msg = [];
      for (let k in data) msg = [...msg, ...data[k]];
      throw Object({ status: res.status, message: msg.join("\n") });
    }
    return Promise.resolve(res.json());
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function loginUser(data) {
  try {
    const res = await fetch(`${BASE_URI_REST_API}/users/login`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const data = JSON.parse(await res.text());
      let msg = [];
      for (let k in data) msg = [...msg, ...data[k]];
      throw Object({ status: res.status, message: msg.join("\n") });
    }
    return Promise.resolve(res.json());
  } catch (error) {
    return Promise.reject(error);
  }
}