import React, { useState, useEffect, useReducer, createContext } from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ClosetContainer from './containers/ClosetContainer'
import OutfitsContainer from './containers/OutfitsContainer'
import ItemForm from './components/ItemForm'
import { api } from './services/api'
import { userReducer, itemsReducer, outfitsReducer, selectedOutfitReducer } from './reducers/Reducers'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import NavBar from './components/NavBar'
import Homepage from './components/Homepage'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


export const StateContext = createContext()
export const MethodContext = createContext()
export const DispatchContext = createContext()
const FETCH_ERROR = 'FETCH_ERROR'
const GET_USER = 'GET_USER'
const GET_ITEMS = 'GET'
const CREATE_ITEM = 'CREATE_ITEM'
const GET_OUTFITS = 'GET_OUTFITS'


const initialState = {
  user: {
    username: '',
    id: null, 
    email: ''
  },
  items: [],
  outfits: [],
  boards: [],
  editMode: false, 
  loading: true,
  selectedOutfit: {
    id: null,
    name: '',
    times_worn: null,
    items: [{id: null, category: '', sub_category: '', color: '', image: '', brand: '', size: '' }]
  }
}

//can change Material UI's default theme colors with this function:
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E33E7F'
    }
  }
})

function App() {
  const [user, userDispatch] = useReducer(userReducer, initialState.user)
  const [items, itemsDispatch] = useReducer(itemsReducer, initialState.items)
  const [outfits, outfitsDispatch] = useReducer(outfitsReducer, initialState.outfits)
  const [selectedOutfit, selectedOutfitDispatch] = useReducer(selectedOutfitReducer, initialState.selectedOutfit)
  const [editMode, setEditMode] = useState(initialState.editMode)
  const [loading, setLoading] = useState(initialState.loading)
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
          setLoading(true)
          api.auth.getCurrentUser().then(user => {
            userDispatch({type: GET_USER, payload: user})
            itemsDispatch({type: GET_ITEMS, payload: user.items})
            outfitsDispatch({type: GET_OUTFITS, payload: user.outfits})
            setLoading(false)
          }).catch(error => userDispatch({type: FETCH_ERROR, payload: error}))
        } 
  }, [])

  const login = (username, password) => {
    api.auth.login(username, password)
    .then(data => {
      localStorage.setItem("token", data.jwt)
      userDispatch({type: GET_USER, payload: data.user})
      itemsDispatch({type: GET_ITEMS, payload: data.user.items})
      outfitsDispatch({type: GET_OUTFITS, payload: data.user.outfits})
    }).catch(error => userDispatch({type: FETCH_ERROR, payload: error})) 
  }

  const addItem = (item) => {
    api.items.addItem(item)
    .then(item => itemsDispatch({type: CREATE_ITEM, payload: item}))
    .catch(error => userDispatch({type: FETCH_ERROR, payload: error}))
  }

  const filterItemsByOutfit = (outfit) => { 
    return items.filter(item => outfit.items.includes(item.id))
  }

  const removeItem = itemId => {
    api.outfits.removeItem(itemId, selectedOutfit.id)
    .then(outfit => {
      outfitsDispatch({type: 'REMOVE_ITEM', payload: outfit})
      selectedOutfitDispatch({type: 'REMOVE_ITEM', payload: outfit})  
    })
  }

  const state =  { user, items, outfits, editMode, loading, selectedOutfit }
  const dispatch = { userDispatch, itemsDispatch, outfitsDispatch, selectedOutfitDispatch }
  const method = { addItem, login, filterItemsByOutfit, setEditMode, removeItem, setLoading }

  return (
    <MuiThemeProvider theme={theme}>
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
              <Route
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
              {/* <Route
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
    </MuiThemeProvider>
  );
}

export default App;
