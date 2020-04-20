const FETCH_ERROR = 'FETCH_ERROR'
const GET_USER = 'GET_USER'
const GET_ITEMS = 'GET'
const CREATE_ITEM = 'CREATE_ITEM'
const EDIT_ITEM = 'EDIT_ITEM'
const DESTROY_ITEM = 'DESTROY_ITEM'
const ADD_ITEM = "ADD_ITEM"
const UPDATE_FORMITEM = "UPDATE_FORMITEM"
const GET_OUTFITS = 'GET_OUTFITS'
const CREATE_OUTFIT = 'CREATE_OUTFIT'
const UPDATE_OUTFIT = 'UPDATE_OUTFIT'
const DELETE_OUTFIT = 'DELETE_OUTFIT'
const SELECT_OUTFIT = 'SELECT_OUTFIT'
const EDIT_NAME = 'EDIT_NAME'
const REMOVE_ITEM = "REMOVE_ITEM"
const SET_ITEM = 'SET_ITEM'
const CLEAR_STATE = "CLEAR_STATE"
const SET_ITEMS = 'SET_ITEMS'
const SET_CURRENT = 'SET_CURRENT'

const userReducer = (state, action) => {
  const { id, username, email } = action.payload  
  switch (action.type) {
    case GET_USER:
      return {
        id: id,
        username: username,
        email: email
      }
    case FETCH_ERROR: 
      return {
        ...state,
        error: action.payload
      } 
    case CLEAR_STATE:
      return action.payload
    default: 
      return state
    }
  }
  
  const itemsReducer = (state, action) => {
    switch (action.type) {
      case GET_ITEMS:
        return [...action.payload]
      case CREATE_ITEM:
        return [...state, action.payload]
      case EDIT_ITEM:
        return {
      // not finished 
    }
    case DESTROY_ITEM: 
      return {
      // not finished
    } 
    case CLEAR_STATE:
      return action.payload
    default: 
      return state
  }
}

const formItemReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORMITEM:
      return {...state, [action.payload.name]: action.payload.value}
    case SET_ITEM:
      return {...state, category: action.payload.category, sub_category: action.payload.sub_category, image: action.payload.image}
    default: 
      return state   
  }
}


const outfitsReducer = (state, action) => {
  switch (action.type) {
    case GET_OUTFITS:
      return action.payload
    case CREATE_OUTFIT:
      return [...state, action.payload]
    case UPDATE_OUTFIT:
      return state.map(outfit => (outfit.id !== action.payload.id) ? outfit : action.payload )
    case DELETE_OUTFIT: 
      return state.filter(outfit => outfit.id !== action.payload)
    case CLEAR_STATE:
      return action.payload
    default: 
      return state
  }                 
}
      
const selectedOutfitReducer = (state, action) => {
  switch (action.type) {
    case SELECT_OUTFIT:
      return action.payload
    case EDIT_NAME:
      return {...state, name: action.payload}
    case REMOVE_ITEM:
      return {...state, items: [...state.items.filter(itemId => itemId !== action.payload)]}
    case ADD_ITEM: 
      return  {...state, items: [action.payload, ...state.items]}
    default: 
      return state
  }
}

const modalItemsReducer = (state, action) => {
  switch (action.type){
    case SET_ITEMS:
      return {
        current: action.payload.current, 
        items: action.payload.itemIds
      }
    case SET_CURRENT: 
      return {...state, current: action.payload}
    default:
      return state
  }
}
        
export { userReducer, itemsReducer, formItemReducer, outfitsReducer, selectedOutfitReducer, modalItemsReducer }