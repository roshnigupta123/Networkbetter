import { CONTACT_LIST_FILTER } from '../Constant';
var _ = require('lodash');

export const contactListfilter = (contacts, categorys, filterContact) => {
  //  console.log("action CONTACT_LIST_FILTER:", contacts, categorys, 'filterContact', filterContact)
    return {
        type: CONTACT_LIST_FILTER,
        payload: {
            category: categorys,
            // contacts : categorys.length == 0 ? filterContact : _.filter(contacts, function (p) {
            //     return _.includes(categorys, p.category);}) 
            contacts: _.filter(contacts, function (p) {
                return _.includes(categorys, p.category);
            })
        }

    }
}

