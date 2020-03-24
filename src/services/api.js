const API_ROOT = 'http://localhost:3000'

const token = () => localStorage.getItem("token");

const headers = () => {
    return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token()
    }
}

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/current_user`, {
  headers: headers()
  }).then(res => res.json())
}

const login = (username, password) => {
    return fetch(`${API_ROOT}/auth`,{
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ auth: {username, password}})
    }).then(res => res.json())    
}

const signup = (username, email, password) => {
    return fetch(`${API_ROOT}/users`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({user: {username, email, password}})
    }).then(res => res.json())
}

const addItem = item => {
  return fetch(`${API_ROOT}/items`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(item)
  }).then(res => res.json())
}


export const api = {
  auth: {
      getCurrentUser,
      login,
      signup
  },
  items: {
    addItem
  }
}