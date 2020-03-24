export { userReducer, itemsReducer }
const FETCH_ERROR = 'FETCH_ERROR'
const GET_USER = 'GET_USER'
const GET_ITEMS = 'GET'
const ADD_ITEM = 'ADD_ITEM'
const EDIT_ITEM = 'EDIT_ITEM'
const DESTROY_ITEM = 'DESTROY_ITEM'

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