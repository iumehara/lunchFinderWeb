import React from 'react'
import {Link} from 'react-router-dom'
import NewCategoryContainer from '../categories/NewCategoryContainer'

export default class TopHeader extends React.Component {
  displayNewCategory() {
    if (this.props.currentMode === 'NEW_CATEGORY_MODE') {
      return <NewCategoryContainer/>
    }
  }

  newCategoryLinkWasClicked() {
    this.props.toggleNewCategoryMode()
  }

  render() {
    return (
      <div className='top-header'>
        <div className='title'>
          <Link to='/'>LunchFinder</Link>
        </div>
        <div className='settings'>
          <div className='add-category' onClick={this.newCategoryLinkWasClicked.bind(this)}>Add Category</div>
          <Link to="/restaurants/new">Add Restaurant</Link>
        </div>

        {this.displayNewCategory()}
      </div>
    )
  }
}