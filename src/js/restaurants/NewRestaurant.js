import React from 'react'
import { Link } from 'react-router-dom'

class NewRestaurant extends React.Component {
  render() {
    return (
      <div>
        <h1 className='title'>New Restaurant</h1>
        <ul>
          <input onChange={this.props.onNameChange}/>
        </ul>
        <button onClick={this.props.createNewRestaurant}>create</button>
      </div>
    )
  }
}

export default NewRestaurant
