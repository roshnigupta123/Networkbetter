import { CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS, CONTACT_LIST_FAILURE, CONTACT_LIST_UPDATE } from "../Constant";

const initialState = {
  loading: false,
  contacts: [],
  error: ''
}

const ContactList_reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CONTACT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
        error: ''
      }
    case CONTACT_LIST_FAILURE:
      return {
        loading: false,
        contacts: [],
        error: action.payload
      }

   case CONTACT_LIST_UPDATE: {
      console.log('reducer', action)
      const index = state.contacts.findIndex(todo => todo.recordID !== action.payload); 
      const newArray = [...state.contacts];
      newArray[index].category = action.payload
      // console.log('newArray', newArray,'newArray')
      return {
        ...state,
        contacts: newArray,
      }
      
   }

    
    default: return state;
  }
}

export default ContactList_reducer;