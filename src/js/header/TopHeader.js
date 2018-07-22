import React from 'react'
import {Link} from 'react-router-dom'
import NewCategoryContainer from '../categories/NewCategoryContainer'
import NewRestaurantContainer from '../restaurants/NewRestaurantContainer'

export default class TopHeader extends React.Component {
  displayModal() {
    if (this.props.currentMode === 'NEW_CATEGORY_MODE') {
      return <NewCategoryContainer/>
    } else if (this.props.currentMode === 'NEW_RESTAURANT_MODE') {
      return <NewRestaurantContainer/>
    }
  }

  newCategoryLinkWasClicked() {
    this.props.toggleNewCategoryMode()
  }

  newRestaurantLinkWasClicked() {
    this.props.toggleNewRestaurantMode()
  }

  render() {
    return (
      <div className='top-header'>
        <div className='title'>
          <Link to='/'>LunchFinder</Link>
        </div>
        <div className='settings'>
          <div className='add-category' onClick={this.newCategoryLinkWasClicked.bind(this)}>Add Category</div>
          <div className='add-restaurant' onClick={this.newRestaurantLinkWasClicked.bind(this)}>Add Restaurant</div>
        </div>

        {this.displayModal()}
      </div>
    )
  }
}