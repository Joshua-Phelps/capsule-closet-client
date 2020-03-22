const API_ROOT = 'http://localhost:3000'

const token = () => localStorage.getItem("token");

const headers = () => {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token()
    };
  };

const getCurrentUser = () => {

}

const login = () => {
      
}

const signup = (username, email, password) => {
    return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({user: {username, email, password}})
    }).then(res => res.json())
}


  export const api = {
    auth: {
        getCurrentUser,
        login,
        signup
    }
  }