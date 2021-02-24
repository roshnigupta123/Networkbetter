import {
    CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS, CONTACT_LIST_FAILURE, CONTACT_LIST_UPDATE,
    CONTACT_LIST_AddNEW, CONTACT_LIST_FILTER, CONTACT_LIST_NOT_FILTER
} from "../Constant";
import { Platform, PermissionsAndroid } from 'react-native';
import Contacts from "react-native-contacts";
var _ = require('lodash');

export const contactListRequest = () => {
    return {
        type: CONTACT_LIST_REQUEST
    }
}

export const contactListSuccess = contacts => {
    return {
        type: CONTACT_LIST_SUCCESS,
        payload: contacts,
        // mainContact: contacts,
    }
}

export const contactListFailure = error => {
    return {
        type: CONTACT_LIST_FAILURE,
        payload: error
    }
}

export const contactListupdate = (contacts, id) => {
    console.log("action contactListupdate:")
    return {
        type: CONTACT_LIST_UPDATE,
        payload: contacts,
        id: id
    }
}

export const contactListRandom = (contacts) => {
    console.log("action contactListRandom:", contacts)
    return {
        type: CONTACT_LIST_AddNEW,
        payload: contacts
    }
}

// export const contactListfilter = (contacts, categorys,filterContact) => {
//     console.log("action CONTACT_LIST_FILTER:",contacts,categorys,'filterContact',filterContact )
//     return {
//         type: CONTACT_LIST_FILTER,
//         payload: {
//             category:categorys,
//             contacts : categorys.length == 0 ? filterContact : _.filter(contacts, function (p) {
//                 return _.includes(categorys, p.category);}) 
//         } 

//     }
// }

export const contactListnotfilter = (contacts) => {
    console.log("action contactListnotfilter:")
    return {
        type: CONTACT_LIST_NOT_FILTER,
        payload: contacts
    }
}


export const contactPermission = () => {
    return (dispatch) => {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: "Contacts",
                message: "This app would like to view your contacts."
            }).then(() => {
                dispatch(loadContacts());
            });
        } else {
            dispatch(loadContacts());
        }
    }
}

export const loadContacts = () => {
    return (dispatch) => {
        dispatch(contactListRequest())
        Contacts.getAll()
            .then(contacts => {
                contacts.sort(
                    (a, b) =>
                        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );
                contacts.map(i => { i["category"] = '' });
                dispatch(contactListSuccess(contacts))
            })
            .catch(error => {
                dispatch(contactListFailure(error))
            });

        Contacts.checkPermission();
    }
}



