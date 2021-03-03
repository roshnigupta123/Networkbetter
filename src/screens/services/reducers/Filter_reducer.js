import { CONTACT_LIST_FILTER } from '../Constant';

var _ = require('lodash');

const initialState = {
  category: [],
  contacts: []
}

const filter_reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_LIST_FILTER: {
    //  console.log('CONTACT_LIST_FILTER', action.payload)
      return {
        ...state,
        contacts: action.payload.contacts,
        category: action.payload.category
      }
    }

    default: return state;
  }
}

export default filter_reducer;