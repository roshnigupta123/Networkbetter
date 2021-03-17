import { CONTACT_LIST_FILTER } from '../Constant';
var _ = require('lodash');

export const contactListfilter = (contacts, categorys, filterContact) => {
    return {
        type: CONTACT_LIST_FILTER,
        payload: {
            category: categorys,
            contacts: _.filter(contacts, function (p) {
                return _.includes(categorys, p.category);
            })
        }

    }
}

