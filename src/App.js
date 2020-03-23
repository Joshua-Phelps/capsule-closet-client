import React, { useEffect, useReducer, createContext } from 'react';
import SignUp from './components/SignUp'
import Login from './components/Login'
import { api } from './services/api';
import { userReducer, itemsReducer } from './reducers/Reducers'
import './App.css';

export const StateContext = createContext()
export const MethodContext = createContext()
export const DispatchContext = createContext()


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
      localStorage.setItem("token", data.jwt)
      userDispatch({type: GET_USER, payload: data.user})
      itemsDispatch({type: GET_ITEMS, payload: data.user.items})
    }).catch(error => userDispatch({type: FETCH_ERROR})) 
  }

  const addItem = (item) => {
    api.items.addItem(item)
    .then(item => !item.error && itemsDispatch({type: ADD_ITEM, payload: item}))
    .catch(error => userDispatch({type: FETCH_ERROR, payload: error}))
  }

  const state =  { user, items }
  const dispatch = { userDispatch, itemsDispatch }
  const method = { addItem, login }

  return (
    <div className="App">
      <StateContext.Provider value={state}>
        <MethodContext.Provider value={method}>
          <DispatchContext.Provider value={dispatch}>

            {/* <SignUp /> */}
            <Login />

          </DispatchContext.Provider>
        </MethodContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
