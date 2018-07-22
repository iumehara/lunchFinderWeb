import {connect} from 'react-redux'
import {fetchCategoriesThenDispatch} from '../actions'
import SubHeader from './SubHeader'

const mapStateToProps = (state) => ({
  categories: state.categories,
  category: state.category,
  restaurants: state.restaurants
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => fetchCategoriesThenDispatch(dispatch),
})

const SubHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubHeader)

export default SubHeaderContainer
