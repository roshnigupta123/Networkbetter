import { connect } from "react-redux";
import { contactPermission, contactListupdate, contactListRandom, contactListfilter } from "../services/actions/ContactList_action";
import { categoryList } from "../services/actions/CategoryList_action";
import Home from './Home';

const mapStateToProps = state => ({
  contacts: state
})

const mapDispatchToProps = dispatch => ({
  categoryList: data => dispatch(categoryList(data)),
  update: (data, id) => dispatch(contactListupdate(data, id)),
  randomContact: (data) => dispatch(contactListRandom(data)),
  contactListfilter: (data, category, filterContact) => dispatch(contactListfilter(data, category, filterContact)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)