import { connect } from 'react-redux'
import Categories from './Categories'
import {
  fetchCategoriesThenDispatch,
  setDispatch
} from '../actions'
import { createCategory } from '../fetchers/resourceFetcher'

export const mapStateToProps = (state, ownProps) => ({
  newCategory: state.newCategory,
  categories: state.categories,
  createNewCategory: () => {
    createCategory(state.newCategory)
      .then(idObject => ownProps.history.push(`/categories/${idObject.id}`))
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
