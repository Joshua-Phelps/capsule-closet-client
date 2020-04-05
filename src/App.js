import React, { useState, useEffect, useReducer, createContext } from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ClosetContainer from './containers/ClosetContainer'
import OutfitsContainer from './containers/OutfitsContainer'
import ItemForm from './components/ItemForm'
import { api } from './services/api'
import { userReducer, itemsReducer, outfitsReducer, selectedOutfitReducer, formItemReducer } from './reducers/Reducers'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import NavBar from './components/NavBar'
import Homepage from './components/Homepage'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'


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
  formItem: {
    category: '',
    sub_category: '',
    color: '',
    size: '',
    brand: '',
    image: ''
  },
  outfits: [],
  boards: [],
  editMode: false, 
  loading: true,
  selectedOutfit: {
    id: null,
    name: '',
    times_worn: null,
    items: []
  }
}

//can change Material UI's default theme colors with this function:
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E33E7F'
    }
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  }
})

function App() {
  const [user, userDispatch] = useReducer(userReducer, initialState.user)
  const [items, itemsDispatch] = useReducer(itemsReducer, initialState.items)
  const [outfits, outfitsDispatch] = useReducer(outfitsReducer, initialState.outfits)
  const [formItem, formItemDispatch] = useReducer(formItemReducer, initialState.formItem)
  const [selectedOutfit, selectedOutfitDispatch] = useReducer(selectedOutfitReducer, initialState.selectedOutfit)
  const [editMode, setEditMode] = useState(initialState.editMode)
  const [loading, setLoading] = useState(initialState.loading)
  const [newOutfitItemCategory, setNewOutfitItemCategory] = useState(null)
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
          setLoading(true)
          api.auth.getCurrentUser().then(user => {
            userDispatch({type: GET_USER, payload: user})
            itemsDispatch({type: GET_ITEMS, payload: user.items})
            outfitsDispatch({type: GET_OUTFITS, payload: user.outfits})
            setLoading(false)
          }).catch(error => userDispatch({type: 'FETCH_ERROR', payload: error}))
        } 
  }, [])

  const login = (username, password) => {
    api.auth.login(username, password)
    .then(data => {
      localStorage.setItem("token", data.jwt)
      userDispatch({type: GET_USER, payload: data.user})
      itemsDispatch({type: GET_ITEMS, payload: data.user.items})
      outfitsDispatch({type: GET_OUTFITS, payload: data.user.outfits})
    }).catch(error => userDispatch({type: 'FETCH_ERROR', payload: error})) 
  } 

  
  const filterItemsByOutfit = outfit => items.filter(item => outfit.items.includes(item.id))

  const removeItem = itemId => selectedOutfitDispatch({type: 'REMOVE_ITEM', payload: itemId})

  const addItem = itemId => {
    setEditMode(true)
    setNewOutfitItemCategory(categoryByItemId(itemId))
    selectedOutfitDispatch({type: 'ADD_ITEM', payload: itemId})
  }

  const createItem = () => {
    const newItem = {...formItem, user_id: user.id}
    console.log(newItem)
    api.items.createItem(newItem)
    .then(item => {
      itemsDispatch({type: 'CREATE_ITEM', payload: item})
    })
  }

  const clearSelectedOutfit = () => {
    selectedOutfitDispatch({type: 'SELECT_OUTFIT', payload: initialState.selectedOutfit})
  }

  const categoryByItemId = itemId => {
    const item = items.filter(item => item.id === itemId)[0]   
    return item.category
  }

  const createOutfit = () => {
    const newOutfit = {...selectedOutfit, user_id: user.id}
    api.outfits.createOutfit(newOutfit)
    .then(outfit => {
      outfitsDispatch({type: 'CREATE_OUTFIT', payload: outfit})
      setEditMode(false)
      clearSelectedOutfit()
    })
  }

  const updateOutfit = () => {
    api.outfits.updateOutfit(selectedOutfit)
    .then(outfit => {
      outfitsDispatch({type: 'UPDATE_OUTFIT', payload: outfit})
      setEditMode(false)
      clearSelectedOutfit()
    })
  }
  
  const deleteOutfit = () => {
    api.outfits.deleteOutfit(selectedOutfit.id)
    .then(() => {
      outfitsDispatch({type: 'DELETE_OUTFIT', payload: selectedOutfit.id})
      clearSelectedOutfit()
      setEditMode(false)
    })
  }

  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories']
  const topsSubCategories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories']

  const state =  { user, items, formItem, outfits, editMode, loading, selectedOutfit, newOutfitItemCategory }
  const dispatch = { userDispatch, itemsDispatch, formItemDispatch, outfitsDispatch, selectedOutfitDispatch }
  const method = { addItem, login, createItem, filterItemsByOutfit, setEditMode, removeItem, setLoading, clearSelectedOutfit, deleteOutfit, updateOutfit, createOutfit, categories }

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
