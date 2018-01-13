import React from 'react'

export default class RestaurantForm extends React.Component {
  componentWillMount() {
    this.props.fetchCategories()
  }

  render() {
    const categoryOptions = this.props.categories.map((category, i) => {
      return <option key={i + 1} value={category.id}>{category.name}</option>
    })
    categoryOptions.unshift(<option key={0}>Select Category</option>)

    const selectedCategories = this.props.newRestaurant.categoryIds.map(id => {
      const categories = this.props.categories.filter(category => category.id == id)
      let categoryName
      if (categories.length > 0) {
        categoryName = categories[0].name
      }

      return (
        <li key={id} className={`category${id}`}>
          <button className='remove' value={id} onClick={this.props.onRemoveCategory}>x</button>
          {categoryName}
        </li>
      )
    })

    const inputIfValueExists = (name, onChange) => {
      if (name && name.length > 0) {
        return <input onChange={onChange} defaultValue={name}/>
      } else {
        return <input onChange={onChange}/>
      }
    }

    return (
      <div>
        <div className='name'>
          <label>Name (English)</label>
          {inputIfValueExists(this.props.newRestaurant.name, this.props.onNameChange)}
        </div>
        <div className='name-jp'>
          <label>店名 (日本語)</label>
          {inputIfValueExists(this.props.newRestaurant.nameJp, this.props.onNameJpChange)}
        </div>
        <div className='categories'>
          <label>categories</label>
          <select name="text" onChange={this.props.onCategoryChange}>{categoryOptions}</select>
          <ul>
            {selectedCategories}
          </ul>
        </div>
        <button className='save' onClick={this.props.saveButtonWasClicked}>update</button>
      </div>
    )
  }
}
