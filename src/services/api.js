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

const createItem = item => {
  return fetch(`${API_ROOT}/items`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({item})
  }).then(res => res.json())
    // .then( item => this.filterItems(item))
}

// //does this function need to go in App.js?
// const filterItems = (items) => {
//   let filteredItems = items.filter(item => {
//     return item.user.id == this.state.user.id
//   })
// }

const createOutfit = outfit => {
  return fetch(`${API_ROOT}/outfits`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(outfit)
  }).then(res => res.json())
}

const updateOutfit = outfit => {
  return fetch(`${API_ROOT}/outfits/${outfit.id}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify(outfit)
  }).then(res => res.json())
}

const deleteOutfit = id => {
  return fetch(`${API_ROOT}/outfits/${id}`, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({outfit:{id}})
  }).then(res => res.json())
}

export const api = {
  auth: {
      getCurrentUser,
      login,
      signup
  },
  items: {
    createItem,
  },
  outfits: {
    createOutfit,
    updateOutfit,
    deleteOutfit
  }
}