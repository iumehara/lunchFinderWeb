import { connect } from 'react-redux'
import Categories from './Categories'
import {
  fetchCategoriesThenDispatch,
  setDispatch
} from '../actions'

export const mapStateToProps = (state, ownProps) => ({
  newCategory: state.newCategory,
  categories: state.categories,
  createNewCategory: () => {
    createCategory(state.newCategory)
      .then(id => ownProps.history.push(`/categories/${id}`))
  }
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCategories: () => fetchCategoriesThenDispatch(dispatch),
  onNameChange: event => {
    setDispatch(event.target.value, 'SET_NEW_CATEGORY_NAME', dispatch)
  }
})

const CategoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)

export default CategoriesContainer
