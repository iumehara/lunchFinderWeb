
import { connect } from 'react-redux'
import Category from './Category'
import {fetchThenDispatch} from '../actions'

export const mapStateToProps = state => ({
  category: state.category
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCategory: () => {
    const url = 'http://localhost:8080/categories/' + ownProps.match.params.id
    fetchThenDispatch(url, 'FETCH_CATEGORY', dispatch)
  }
})

const CategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)

export default CategoryContainer
