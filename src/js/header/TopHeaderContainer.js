import {connect} from 'react-redux'
import TopHeader from './TopHeader'

const mapStateToProps = (state) => ({
  currentMode: state.currentMode
})

const mapDispatchToProps = (dispatch) => ({
  toggleNewCategoryMode: () => dispatch({type: 'TOGGLE_NEW_CATEGORY_MODE'}),
  toggleNewRestaurantMode: () => dispatch({type: 'TOGGLE_NEW_RESTAURANT_MODE'})
})

const TopHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopHeader)

export default TopHeaderContainer
