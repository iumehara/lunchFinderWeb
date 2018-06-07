import {connect} from 'react-redux'
import {fetchCategoriesThenDispatch} from '../actions'
import Header from './Header'

const mapStateToProps = (state) => ({
  categories: state.categories
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => fetchCategoriesThenDispatch(dispatch),
})

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
