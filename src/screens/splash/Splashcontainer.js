import { connect } from "react-redux";
import { contactPermission } from "../services/actions/ContactList_action";
import Splash from './Splash';
import {permission_calls} from '../services/actions/CallLog_action';

const mapStateToProps = state => ({
    contacts: state
})

const mapDispatchToProps = dispatch => ({
    contactPermission: data => dispatch(contactPermission(data)),
    permission_calls: data=>dispatch(permission_calls(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Splash);