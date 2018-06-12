import {connect} from 'react-redux'
import Category from './Category'
import {setDispatch} from '../actions'
import {getCategory, getCategoryRestaurants} from '../fetchers/resourceFetcher'

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  category: state.category,
  restaurants: state.restaurants
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategory: id => {
    getCategory(id)
      .then(data => setDispatch(data, 'FETCH_CATEGORY', dispatch))
  },
  fetchCategoryRestaurants: id => {
    getCategoryRestaurants(id)
      .then(data => setDispatch(data, 'FETCH_RESTAURANTS', dispatch))
  }
})

const CategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)

export default CategoryContainer
