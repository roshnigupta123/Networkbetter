import { CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS, CONTACT_LIST_FAILURE, CONTACT_LIST_UPDATE,
    CONTACT_LIST_AddNEW } from "../Constant";
import { Platform, PermissionsAndroid } from 'react-native';
import Contacts from "react-native-contacts";

export const contactListRequest = () => {
    return {
        type: CONTACT_LIST_REQUEST
    }
}

export const contactListSuccess = contacts => {
    return {
        type: CONTACT_LIST_SUCCESS,
        payload: contacts
    }
}

export const contactListFailure = error => {
    return {
        type: CONTACT_LIST_FAILURE,
        payload: error
    }
}

export const contactListupdate = (contacts) => {
    console.log("action update:" )
    return {
        type: CONTACT_LIST_UPDATE,
        payload: contacts
    }
}

export const contactListRandom = (contacts) => {
    console.log("action update:" )
    return {
        type: CONTACT_LIST_AddNEW,
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
            contacts.map(i=>{i["category"] = ''});
            dispatch(contactListSuccess(contacts))
        })
        .catch(error => {
            dispatch(contactListFailure(error))
        });

    Contacts.checkPermission();
    }
}



