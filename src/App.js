import React, { useEffect, useReducer, createContext } from 'react';
import SignUp from './components/SignUp'
import Login from './components/Login'
import { api } from './services/api';
import { userReducer, itemsReducer } from './reducers/Reducers'
import './App.css';

export const Context = createContext()

const initialState = {
  user: {
    username: '',
    id: null, 
    email: ''
  },
  items: [],
  outfits: [],
  boards: [],
  editMode: false 
}

function App() {
  const [user, userDispatch] = useReducer(userReducer, initialState.user)
  const [items, itemsDispatch] = useReducer(itemsReducer, initialState.items)
  const FETCH_ERROR = 'FETCH_ERROR'
  const GET_USER = 'GET_USER'
  const GET_ITEMS = 'GET'
  const ADD_ITEM = 'ADD_ITEM'


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
          api.auth.getCurrentUser().then(user => {
            userDispatch({type: GET_USER, payload: user})
            itemsDispatch({type: GET_ITEMS, payload: user.items})
          }).catch(error => userDispatch({type: FETCH_ERROR}))
        } 
  }, [])

  const login = (username, password) => {
    api.auth.login(username, password)
    .then(data => {
      const { user } = data.user
      localStorage.setItem("token", data.jwt)
      userDispatch({type: GET_USER, payload: user})
      itemsDispatch({type: GET_ITEMS, payload: user.items})
    }).catch(error => userDispatch({type: FETCH_ERROR})) 
  }

  const addItem = () => {
    const item = {category: 'some category', sub_category: 'sub', color: 'red', size: 'small', brand: 'nike', user_id: 5, image: 'image'}
    api.items.addItem(item)
    .then(item => !item.error && itemsDispatch({type: ADD_ITEM, payload: item}))
    .catch(error => userDispatch({type: FETCH_ERROR, payload: error}))
  }

  const context =  { user, userDispatch, items, itemsDispatch, addItem }
  return (
    <div className="App">
      <button onClick={addItem}>addItem</button>
      <Context.Provider value={context}>
        {/* <SignUp /> */}
        <Login onLogin={login} />
      </Context.Provider>
    </div>
  );
}

export default App;
