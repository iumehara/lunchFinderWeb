import {connect} from 'react-redux'
import {fetchCategoriesThenDispatch} from '../actions'
import SubHeader from './SubHeader'

const mapStateToProps = (state) => ({
  categories: state.categories,
  category: state.category
})

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => fetchCategoriesThenDispatch(dispatch),

  onSelectChange: (event, data) => {
    if (event.target.value === 'popularity') {
      dispatch({type: 'ORDER_BY_RESTAURANTS_COUNT', data})
    } else {
      dispatch({type: 'ORDER_BY_NAME', data})
    }
  }
})

const SubHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubHeader)

export default SubHeaderContainer
