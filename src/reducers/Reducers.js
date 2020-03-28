const FETCH_ERROR = 'FETCH_ERROR'
const GET_USER = 'GET_USER'
const GET_ITEMS = 'GET'
const ADD_ITEM = 'ADD_ITEM'
const EDIT_ITEM = 'EDIT_ITEM'
const DESTROY_ITEM = 'DESTROY_ITEM'
const GET_OUTFITS = 'GET_OUTFITS'
const ADD_OUTFIT = 'ADD_OUTFIT'
const EDIT_OUTFIT = 'EDIT_OUTFIT'
const DESTROY_OUTFIT = 'DESTROY_OUTFIT'
const SET_OUTFIT = 'SET_OUTFIT'

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
        case ADD_ITEM:
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
      case ADD_OUTFIT:
        return // not finsihed 
        case EDIT_OUTFIT:
          return {
            // not finished 
          }
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
    case SET_OUTFIT:
    return action.payload
    default: 
    return state
  }
}
        
export { userReducer, itemsReducer, outfitsReducer, selectedOutfitReducer }