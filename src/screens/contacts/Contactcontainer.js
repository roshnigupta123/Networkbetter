import { connect } from "react-redux";
import { contactPermission } from "../services/actions/ContactList_action";
import Contact from './Contact';

const mapStateToProps = state => ({
    contacts: state
    //  contacts: state.contacts.ContactList_reducer.contacts
})

const mapDispatchToProps = dispatch => ({
    contactPermission: data => dispatch(contactPermission(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact);