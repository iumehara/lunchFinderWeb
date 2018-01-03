
import { connect } from 'react-redux'
import Categories from './Categories'
import {fetchThenDispatch} from '../actions'

export const mapStateToProps = state => ({
  categories: state.categories
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCategories: () => {
    const url = 'http://localhost:8080/categories'
    fetchThenDispatch(url, 'FETCH_CATEGORIES', dispatch)
  }
})

const CategoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)

export default CategoriesContainer
