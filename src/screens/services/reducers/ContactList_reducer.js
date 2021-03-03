import {
  CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS, CONTACT_LIST_FAILURE,
  CONTACT_LIST_UPDATE, CONTACT_LIST_AddNEW, CONTACT_LIST_FILTER, CONTACT_LIST_NOT_FILTER
} from "../Constant";
var _ = require('lodash');

const initialState = {
  loading: false,
  contacts: [],
  error: '',
  filterContact: [],
  category: [],

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
        filterContact: action.payload,
        error: ''
      }
    case CONTACT_LIST_FAILURE:
      return {
        loading: false,
        contacts: [],
        error: action.payload
      }

    case CONTACT_LIST_AddNEW:
      // console.log('newadd',action.payload)
      return {
        ...state, contacts: action.payload,
        filterContact: action.payload,
      }

    case CONTACT_LIST_UPDATE: {
    //  console.log('CONTACT_LIST_UPDATEreducer', action)
      let data = state.contacts
      let index = data.findIndex(el => el.recordID === action.id);
      data[index] = { ...data[index], category: action.payload };
      return {
        ...state,
        contacts: data,
        // filterContact:data
      }

    }

    // case CONTACT_LIST_FILTER: {
    //   console.log('CONTACT_LIST_FILTER', action.payload)
    //   return {
    //     ...state,
    //     contacts: action.payload.contacts, category: action.payload.category
    //   }
    // }

    case CONTACT_LIST_NOT_FILTER: {
     // console.log('CONTACT_LIST_NOT_FILTER', action)
      return {
        ...state,
        contacts: action.payload,
      }
    }

    default: return state;
  }
}

export default ContactList_reducer;