import { connect } from "react-redux";
import { contactPermission ,contactListupdate} from "../services/actions/ContactList_action";
import { categoryList } from "../services/actions/CategoryList_action";
import Contact from './Contact';

const mapStateToProps = state => ({
    contacts: state
    //  contacts: state.contacts.ContactList_reducer.contacts
})

const mapDispatchToProps = dispatch => ({
    //contactPermission: data => dispatch(contactPermission(data)),
    categoryList: data => dispatch(categoryList(data)),
    update: (data,id)=>dispatch(contactListupdate(data,id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact);