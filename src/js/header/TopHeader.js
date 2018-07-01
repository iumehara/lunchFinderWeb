import React from 'react'
import {Link} from 'react-router-dom'

export default class TopHeader extends React.Component {
  render() {
    return (
      <div className='top-header'>
        <div className='title'>
          LunchFinder
        </div>
        <div className='settings'>
          <Link to="/categories/new">Add Category</Link>
          <Link to="/restaurants/new">Add Restaurant</Link>
        </div>
      </div>
    )
  }
}