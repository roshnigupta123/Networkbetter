import { connect } from "react-redux";
import { categoryList } from "../services/actions/CategoryList_action";
import Sidebarmenu from './Sidebarmenu'

const mapStateToProps=state=>({
    category: state
  })
  
  const mapDispatchToProps=dispatch=>({
    categoryList: data=>dispatch(categoryList(data)),
   
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sidebarmenu)