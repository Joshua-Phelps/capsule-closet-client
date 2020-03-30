const FETCH_ERROR = 'FETCH_ERROR'
const GET_USER = 'GET_USER'
const GET_ITEMS = 'GET'
const CREATE_ITEM = 'CREATE_ITEM'
const EDIT_ITEM = 'EDIT_ITEM'
const DESTROY_ITEM = 'DESTROY_ITEM'
const ADD_ITEM = "ADD_ITEM"
const GET_OUTFITS = 'GET_OUTFITS'
const CREATE_OUTFIT = 'CREATE_OUTFIT'
const UPDATE_OUTFIT = 'UPDATE_OUTFIT'
const DESTROY_OUTFIT = 'DESTROY_OUTFIT'
const SELECT_OUTFIT = 'SELECT_OUTFIT'
const EDIT_NAME = 'EDIT_NAME'
const REMOVE_ITEM = "REMOVE_ITEM"

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
      default: 
    return state
  }
}

const outfitsReducer = (state, action) => {
  switch (action.type) {
    case GET_OUTFITS:
      return [...action.payload]
    case CREATE_OUTFIT:
      return // not finsihed 
    case UPDATE_OUTFIT:
      const updatedState = state.filter(outfit => outfit.id !== action.payload.id)
      return [...updatedState, action.payload] 
    case DESTROY_OUTFIT: 
      return {
      // not finished
    } 
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
      return [action.payload, ...state]
    default: 
      return state
  }
}
        
export { userReducer, itemsReducer, outfitsReducer, selectedOutfitReducer }