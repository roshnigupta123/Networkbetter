import { PermissionsAndroid, Platform } from "react-native";
import Contacts from "react-native-contacts";

export function Contact() {
    return async (dispatch)=>{
     if (Platform.OS === "android") {
         PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: "Contacts",
            message: "This app would like to view your contacts."
        }).then(() => {
              return (dispatch(loadContacts()));
        });
    } 
    // else {
    //     return (dispatch(loadContacts()));
    // }
}
}

export  function loadContacts() {
    return async (dispatch)=>{
      Contacts.getAll()
        .then(contacts => {
            contacts.sort(
                (a, b) =>
                    a.givenName.toLowerCase() > b.givenName.toLowerCase(),
            );
             console.log('action contact', contacts[1])
         return (dispatch(contacts));
        })
        .catch(e => {
            console.log('err', e)
        });
        Contacts.checkPermission();
    }
   

    // alert('hii')
}

export function contactList(contacts) {
     return {
         type: "CONTACTS",
        payload: contacts
     }
}