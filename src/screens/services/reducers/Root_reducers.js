import { combineReducers } from "redux";
import ContactList_reducer from './ContactList_reducer';
import CategoryList_reducer from './CategoryList_reducer';
import CallLog_reducer from './CallLog_reducer';
import filter_reducer from './Filter_reducer';

export default combineReducers({
    ContactList_reducer, CategoryList_reducer, CallLog_reducer, filter_reducer
})