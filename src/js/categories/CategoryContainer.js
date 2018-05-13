import {connect} from 'react-redux'
import Category from './Category'
import {setDispatch} from '../actions'
import {getCategory} from '../fetchers/resourceFetcher'

export const mapStateToProps = state => ({
  category: state.category
})

export const mapDispatchToProps = (dispatch) => ({
  fetchCategory: id => {
    getCategory(id)
      .then(data => setDispatch(data, 'FETCH_CATEGORY', dispatch))
  }
})

const CategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)

export default CategoryContainer
