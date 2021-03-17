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
    }
}

export const contactListFailure = error => {
    return {
        type: CONTACT_LIST_FAILURE,
        payload: error
    }
}

export const contactListupdate = (contacts, id) => {
    return {
        type: CONTACT_LIST_UPDATE,
        payload: contacts,
        id: id
    }
}

export const contactListRandom = (contacts) => {
    return {
        type: CONTACT_LIST_AddNEW,
        payload: contacts
    }
}

export const contactListnotfilter = (contacts) => {
    return {
        type: CONTACT_LIST_NOT_FILTER,
        payload: contacts
    }
}


export const contactPermission = () => {
    return (dispatch) => {
        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: "Access your contacts",
                message: "We are requesting for Contact List access as we want to recommend user to connect with people in their contact list.",
                buttonPositive: 'OK',
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



