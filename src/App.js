import React, { useEffect, useReducer, createContext } from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ClosetContainer from './containers/ClosetContainer'
import { api } from './services/api'
import { userReducer, itemsReducer } from './reducers/Reducers'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import NavBar from './components/NavBar'
import Homepage from './components/Homepage'

export const StateContext = createContext()
export const MethodContext = createContext()
export const DispatchContext = createContext()
const FETCH_ERROR = 'FETCH_ERROR'
const GET_USER = 'GET_USER'
const GET_ITEMS = 'GET'
const ADD_ITEM = 'ADD_ITEM'


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
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
          api.auth.getCurrentUser().then(user => {
            userDispatch({type: GET_USER, payload: user})
            itemsDispatch({type: GET_ITEMS, payload: user.items})
          }).catch(error => userDispatch({type: FETCH_ERROR, payload: error}))
        } 
  }, [])

  const login = (username, password) => {
    api.auth.login(username, password)
    .then(data => {
      localStorage.setItem("token", data.jwt)
      userDispatch({type: GET_USER, payload: data.user})
      itemsDispatch({type: GET_ITEMS, payload: data.user.items})
    }).catch(error => userDispatch({type: FETCH_ERROR, payload: error})) 
  }

  const addItem = (item) => {
    api.items.addItem(item)
    .then(item => itemsDispatch({type: ADD_ITEM, payload: item}))
    .catch(error => userDispatch({type: FETCH_ERROR, payload: error}))
  }

  const state =  { user, items }
  const dispatch = { userDispatch, itemsDispatch }
  const method = { addItem, login }

  return (
    <Router>
    <div className="App">
      <StateContext.Provider value={state}>
        <MethodContext.Provider value={method}>
          <DispatchContext.Provider value={dispatch}>
            <Route
              path="/"
              render={props => <NavBar {...props} />}
            />
            <Route
              exact
              path="/"
              render={props => <Homepage {...props} />}
            />
            <Route
              exact
              path="/signup"
              render={props => <SignUp {...props} />}
            />
            <Route
              exact
              path="/login"
              render={props => <Login {...props} />}
            />
            {/* <Route
              exact
              path="/guide"
              render={props => <GuideContainer {...props} />}
            /> */}
            <Route
              exact
              path="/closet"
              render={props => <ClosetContainer {...props} />}
            />
            {/* <Route
              exact
              path="/create-item"
              render={props => <ItemForm {...props} />}
            />
            <Route
              exact
              path="/edit-item/:id"
              render={props => <ItemForm {...props} />}
            />
            <Route
              exact
              path="/outfits"
              render={props => <OutfitsContainer {...props} />}
            /> 
            <Route
              exact
              path="/create-outfit"
              render={props => <OufitForm {...props} />}
            />
            <Route
              exact
              path="/edit-oufit/:id"
              render={props => <OutfitForm {...props} />}
            />
            <Route
              exact
              path="/boards"
              render={props => <BoardsContainer {...props} />}
            />
            <Route
              exact
              path="/create-board"
              render={props => <BoardForm {...props} />}
            />
            <Route
              exact
              path="/edit-board/:id"
              render={props => <BoardForm {...props} />}
            />
            <Route
              exact
              path="/edit-account/:id"
              render={props => <AccountForm {...props} />}
            />             */}

          </DispatchContext.Provider>
        </MethodContext.Provider>
      </StateContext.Provider>
    </div>
    </Router>
  );
}

export default App;
