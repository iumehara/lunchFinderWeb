import { connect } from 'react-redux'
import Categories from './Categories'
import {
  fetchThenDispatch,
  setDispatch
} from '../actions'
import { httpPost } from '../fetchers/httpFetcher'

export const mapStateToProps = (state, ownProps) => ({
  newCategory: state.newCategory,
  categories: state.categories,
  createNewCategory: () => {
    const url = 'http://localhost:8080/categories/'
    httpPost(url, state.newCategory)
      .then(id => ownProps.history.push(`/categories/${id}`))
  }
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCategories: () => {
    const url = 'http://localhost:8080/categories'
    fetchThenDispatch(url, 'FETCH_CATEGORIES', dispatch)
  },
  onNameChange: event => {
    setDispatch(event.target.value, 'SET_NEW_CATEGORY_NAME', dispatch)
  }
})

const CategoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)

export default CategoriesContainer
