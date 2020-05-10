import React, { useState, useEffect, useReducer, createContext } from 'react'
import SignUp from './components/SignUp'
import Login from './components/Login'
import ClosetContainer from './containers/ClosetContainer'
import OutfitsContainer from './containers/OutfitsContainer'
import ItemForm from './components/ItemForm'
import { api } from './services/api'
import { 
  userReducer, 
  itemsReducer, 
  outfitsReducer,
  boardsReducer, 
  selectedOutfitReducer, 
  formItemReducer,
  modalItemsReducer 
} from './reducers/Reducers'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import NavBar from './components/NavBar'
import Homepage from './components/Homepage'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import GuideContainer from './containers/GuideContainer'
import BoardsContainer from './containers/BoardsContainer'

export const StateContext = createContext()
export const MethodContext = createContext()
export const DispatchContext = createContext()
const FETCH_ERROR = 'FETCH_ERROR'
const GET_USER = 'GET_USER'
const GET_ITEMS = 'GET'
const CREATE_ITEM = 'CREATE_ITEM'
const GET_OUTFITS = 'GET_OUTFITS'
const GET_BOARDS = 'GET_BOARDS'


const initialState = {
  user: {
    username: '',
    id: null, 
    email: ''
  },
  items: [],
  formItem: {
    id: null,
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
  },
  modalItems: {current: {}, items:[]}
}

//can change Material UI's default theme colors with this function:
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#607d8b',//#66b783 #a6dadc
      light: '#e0e0e0', //#efefef
      dark: '#35717a', //#29434e
      gradient: 'linear-gradient(45deg, #09203f 0%, #537895 100%)'
      
    },
    secondary: {
      main:'#546e7a',
      light: '#819ca9',
      dark: '#29434e'
    }
  }
})

function App() {
  const [user, userDispatch] = useReducer(userReducer, initialState.user)
  const [items, itemsDispatch] = useReducer(itemsReducer, initialState.items)
  const [outfits, outfitsDispatch] = useReducer(outfitsReducer, initialState.outfits)
  const [boards, boardsDispatch] = useReducer(boardsReducer, initialState.boards)
  const [formItem, formItemDispatch] = useReducer(formItemReducer, initialState.formItem)
  const [selectedOutfit, selectedOutfitDispatch] = useReducer(selectedOutfitReducer, initialState.selectedOutfit)
  const [modalItems, modalItemsDispatch] = useReducer(modalItemsReducer, initialState.modalItems)
  const [editMode, setEditMode] = useState(initialState.editMode)
  const [loading, setLoading] = useState(initialState.loading)
  const [newOutfitItemCategory, setNewOutfitItemCategory] = useState(null)
  const [navBarValue, setNavBarValue] = useState(false)
  const [categoryNavBarValue, setCategoryNavBarValue] = useState('')
  const [openItemModal, setOpenItemModal] = useState(false)
  const [itemDisplayModal, setItemDisplayModal] = useState(false)
  const [subCategoryFilter, setSubCategoryFilter] = useState('')
  const [closetColorFilter, setClosetColorFilter] = useState('')
  const [closetBrandFilter, setClosetBrandFilter] = useState('')
  const [closetSizeFilter, setClosetSizeFilter] = useState('')
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
          setLoading(true)
          api.auth.getCurrentUser().then(user => {
            userDispatch({type: GET_USER, payload: user})
            itemsDispatch({type: GET_ITEMS, payload: user.items})
            outfitsDispatch({type: GET_OUTFITS, payload: user.outfits})
            boardsDispatch({type: GET_BOARDS, payload: user.boards})
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
      boardsDispatch({type: GET_BOARDS, payload: data.user.boards})
    }).catch(error => userDispatch({type: 'FETCH_ERROR', payload: error})) 
  } 

  const clearState = () => {
    console.log('hello')
    userDispatch({type: 'CLEAR_STATE', payload: initialState.user})
    itemsDispatch({type: 'CLEAR_STATE', payload: initialState.items})
    outfitsDispatch({type: 'CLEAR_STATE', payload: initialState.outfits})
    boardsDispatch({type: 'CLEAR_STATE', payload: initialState.boards})
  }

  // const filterItemsByOutfit = outfit => items.filter(item => outfit.items.includes(item.id))

  const filterItemsByOutfit = outfit => {
    return outfit.items.map(id => items.filter(item => item.id ===id)[0])
  }

  const filterOutfitsByBoard = board => {
    return board.outfits.map(id => outfits.filter(outfit => outfit.id ===id)[0])
  }

  const removeItem = itemId => selectedOutfitDispatch({type: 'REMOVE_ITEM', payload: itemId})

  const addItem = itemId => {
    !editMode && setEditMode(true)
    const category = categoryByItemId(itemId)
    // sets state to category + '2' to rerender DrawerCategory
    if (newOutfitItemCategory === category) {
      setNewOutfitItemCategory(category + '2')
    } else if (newOutfitItemCategory === category + '2') {
      setNewOutfitItemCategory(category)
    } else setNewOutfitItemCategory(category)
    selectedOutfitDispatch({type: 'ADD_ITEM', payload: itemId})
  }

  const createItem = () => {
    let data = new FormData()
    data.append('item[category]', formItem.category)
    data.append('item[sub_category]', formItem.sub_category)
    data.append('item[color]', formItem.color)
    data.append('item[brand]', formItem.brand)
    data.append('item[size]', formItem.size)
    data.append('item[avatar]', formItem.image)
    data.append('item[user_id]', user.id)
    api.items.createItem(data)
    .then(item => itemsDispatch({type: 'CREATE_ITEM', payload: item}))
  }

  const clearSelectedOutfit = () => {
    selectedOutfitDispatch({type: 'SELECT_OUTFIT', payload: initialState.selectedOutfit})
  }

  const getItemOutfits = (itemId) => {
    return outfits.filter(outfit => {
      if (outfit.items.includes(itemId)){
        return outfit
      }
    })
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

  const categoryItems = (category, items) => items.filter(item => item.category.includes(category))

  const getSubCategoryItems = (subCategory, items) => items.filter(item => item.subCategory === subCategory)

  const getSubCategories = (items, subCategory) => {
    let subCatObj = {}
    items.forEach(item => {
      subCatObj[item[subCategory]] = subCatObj[item[subCategory]] || true
    })
    return Object.keys(subCatObj).sort()
  }

  const closetDisplayedItems = items.filter(item => {
    return item.category.includes(categoryNavBarValue) 
    && item.sub_category.includes(subCategoryFilter)
    && item.color.includes(closetColorFilter)
    && item.size.includes(closetSizeFilter)
    && item.brand.includes(closetBrandFilter)
  })

  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories']
  // const topsSubCategories = ['Tank Shirt', 'White Top', ]

  const dispatch = { userDispatch, itemsDispatch, formItemDispatch, outfitsDispatch, selectedOutfitDispatch, modalItemsDispatch, boardsDispatch }
  const state =  { 
    user, 
    items, 
    formItem,
    outfits,
    boards, 
    editMode, 
    loading, 
    selectedOutfit, 
    newOutfitItemCategory, 
    navBarValue, 
    categoryNavBarValue,
    openItemModal,
    subCategoryFilter,
    closetColorFilter,
    closetBrandFilter,
    closetSizeFilter,
    itemDisplayModal,
    modalItems
  }
  const methods = { 
    addItem, 
    login, 
    filterItemsByOutfit,
    filterOutfitsByBoard, 
    setEditMode, 
    removeItem, 
    setLoading, 
    clearSelectedOutfit, 
    deleteOutfit, 
    updateOutfit, 
    createOutfit, 
    categories, 
    setNavBarValue,
    categoryItems,
    setCategoryNavBarValue,
    closetDisplayedItems,
    setOpenItemModal,
    createItem, 
    getSubCategoryItems,
    getSubCategories,
    setSubCategoryFilter,
    clearState,
    setClosetColorFilter,
    setClosetSizeFilter,
    setClosetBrandFilter,
    setItemDisplayModal,
    getItemOutfits
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
      <div className="App">
        <StateContext.Provider value={state}>
          <MethodContext.Provider value={methods}>
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
              <Route
                exact
                path="/guide"
                render={props => <GuideContainer {...props} />}
              />
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
              /> */}
              <Route
                exact
                path="/boards"
                render={props => <BoardsContainer {...props} />}
              />
              {/* <Route
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
