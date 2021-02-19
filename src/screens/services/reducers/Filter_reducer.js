import {CONTACT_LIST_FILTER} from '../Constant';

var _ = require('lodash');

const initialState = {
  filterContact: [],
}

const filter_reducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTACT_LIST_FILTER: {
            console.log('CONTACT_LIST_FILTER', action)
            const newMainContact=action.payload
            const data = newMainContact
            var filtered_ids = _.filter(data, function (p) {
            return _.includes(action.category, p.category);
          });
         console.log('filtered_ids', filtered_ids)
            return {
              ...state,
              filterContact: filtered_ids,
            }
          }
        default: return state;
    }
}

export default filter_reducer;