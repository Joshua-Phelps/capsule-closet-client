import React, { useEffect, useReducer, createContext } from 'react';
import SignUp from './components/SignUp'
import Login from './components/Login'
import { api } from './services/api';
import './App.css';
import { CardActions } from '@material-ui/core';

export const StateContext = createContext()

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
const FETCH_ERROR = 'FETCH_ERROR'
const GET_USER = 'GET_USER'
const GET_ITEMS = 'GET'
const ADD_ITEM = 'ADD_ITEM'
const EDIT_ITEM = 'EDIT_ITEM'
const DESTROY_ITEM = 'DESTROY_ITEM'

const userReducer = (state, action) => {
  const { id, username, email, items, outfits, boards } = action.payload  
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        id: id,
        username: username,
        email: email
      }
    case FETCH_ERROR: 
    return {
      ...state,
      error: action.payload
    } 
    default: 
      return state
  }
}

const itemsReducer = (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        ...action.payload
      }
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case EDIT_ITEM:
    return {
      ...state,
    }
    case DESTROY_ITEM: 
    return {
      user: {
        username: '',
        id: null, 
        email: ''
      },
      error: action.payload
    } 
    default: 
      return state
  }
}

function App() {
  const [user, userDispatch] = useReducer(userReducer, initialState.user)
  const [items, itemsDispatch] = useReducer(itemsReducer, [])


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


  return (
    <div className="App">
      <button onClick={addItem}>addItem</button>
      <StateContext.Provider value={{user, userDispatch, items, itemsDispatch }}>
        {/* <SignUp /> */}
        <Login onLogin={login} />
      </StateContext.Provider>
    </div>
  );
}

export default App;
