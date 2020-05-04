import { BASE_URI_REST_API } from '../constants/base.uri';

export async function createDisponibility(data) {
    try {
      const res = await fetch(`${BASE_URI_REST_API}/disponibilities`, {
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


  export async function deleteDisponibilityById(id) {
    try {
      const res = await fetch(`${BASE_URI_REST_API}/disponibilities/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
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


  export async function deleteDisponibilityByUserIdAndDay(userId, day) {
    try {
      const res = await fetch(`${BASE_URI_REST_API}/disponibilities/${userId}/${day}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      });
  
      if (!res.ok) {
        const data = JSON.parse(await res.text());
        let msg = [];
        for (let k in data) msg = [...msg, ...data[k]];
        throw Object({ status: res.status, message: msg });
      }
      return Promise.resolve(res.json());
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

export async function getDisponibilityUser (id, dayOfWeek) {
    try {
        const res = await fetch(`${BASE_URI_REST_API}/disponibilities/${id}/${dayOfWeek}`, {
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

        // console.log(res.json());
        return Promise.resolve(res.json());
      } catch (error) {
        return Promise.reject(error);
      }
}