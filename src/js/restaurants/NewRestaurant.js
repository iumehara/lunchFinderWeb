import React from 'react'
import { Link } from 'react-router-dom'

class NewRestaurant extends React.Component {
  componentWillMount() {
    this.props.fetchCategories()
  }

  render() {
    const categoryOptions = this.props.categories.map((category, i) => {
      return <option key={i} value={category.id}>{category.name}</option>
    })

    const selectedCategories = this.props.newRestaurant.categoryIds.map(id => {
      const categoryName = this.props.categories.filter(category => category.id == id)[0].name

      return (
        <li key={id} className={`category${id}`}>
          <button className='remove' value={id} onClick={this.props.onRemoveCategory}>x</button>
          {categoryName}
        </li>
      )
    })

    return (
      <div>
        <h1 className='title'>New Restaurant</h1>
        <div className='name'>
          <label>name</label>
          <input onChange={this.props.onNameChange}/>
        </div>
        <div className='categories'>
          <label>categories</label>
          <select name="text" onChange={this.props.onCategoryChange}>{categoryOptions}</select>
          <ul>
            {selectedCategories}
          </ul>
        </div>
        <button className='save' onClick={this.props.createNewRestaurant}>create</button>
      </div>
    )
  }
}

export default NewRestaurant
