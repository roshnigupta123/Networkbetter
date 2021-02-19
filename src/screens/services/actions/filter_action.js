import {CONTACT_LIST_FILTER} from '../Constant';

export const contactListfilter = (contacts, category) => {
    console.log("action CONTACT_LIST_FILTER:" )
    return {
        type: CONTACT_LIST_FILTER,
        payload: contacts,
        category:category
    }

}