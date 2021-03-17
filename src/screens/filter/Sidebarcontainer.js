import { connect } from "react-redux";
import { categoryList } from "../services/actions/CategoryList_action";
import Sidebarmenu from './Sidebarmenu'
import { contactListfilter } from '../services/actions/filter_action';

const mapStateToProps = state => ({
  category: state,
})

const mapDispatchToProps = dispatch => ({
  categoryList: data => dispatch(categoryList(data)),
  contactListfilter: (data, category, filterContact) => dispatch(contactListfilter(data, category, filterContact)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebarmenu)