import { connect } from "react-redux";
import { categoryList } from "../services/actions/CategoryList_action";
import Sidebarmenu from './Sidebarmenu'
import {contactListfilter, contactListnotfilter, contactPermission} from '../services/actions/ContactList_action';

const mapStateToProps=state=>({
    category: state
  })
  
  const mapDispatchToProps=dispatch=>({
    categoryList: data=>dispatch(categoryList(data)),
    contactListfilter: data=>dispatch(contactListfilter(data)),
    contactListnotfilter: data=>dispatch(contactListnotfilter(data)),
     contactPermission: data=>dispatch(contactPermission(data)),
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sidebarmenu)