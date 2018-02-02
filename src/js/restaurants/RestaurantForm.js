// @flow
import React from 'react'
import type { NewRestaurantType } from './RestaurantTypes'

type Props = {
  categories: [],
  newRestaurant: NewRestaurantType,
  editMode: boolean,
  fetchCategories: () => {},
  onRemoveCategory: () => {},
  onInputChange: (fieldObject: Object) => {},
  onGeolocationChange: (geolocation: Object) => {},
  onCategoryChange: () => {},
  saveButtonWasClicked: () => {}
}

export default class RestaurantForm extends React.Component<Props> {
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

    const isValidInput = value => {
      if (value && typeof(value) == 'number') {
        return value > 0
      } else {
        return value && value.length > 0
      }
    }

    const inputIfValueExists = (value, onChange) => {
      if(this.props.editMode && isValidInput(value)) {
        return <input onChange={onChange} defaultValue={value}/>
      } else {
        return <input onChange={onChange}/>
      }
    }

    const onNameChange = e => this.props.onInputChange({name: e.target.value})
    const onNameJpChange = e => this.props.onInputChange({nameJp: e.target.value})
    const onWebsiteChange = e => this.props.onInputChange({website: e.target.value})
    const onGeolocationLatChange = e => this.props.onGeolocationChange({lat: e.target.value})
    const onGeolocationLongChange = e => this.props.onGeolocationChange({long: e.target.value})

    const newRestaurant = this.props.newRestaurant

    return (
      <div>
        <div className='name'>
          <label>Name (English)</label>
          {inputIfValueExists(newRestaurant.name, onNameChange)}
        </div>
        <div className='name-jp'>
          <label>店名 (日本語)</label>
          {inputIfValueExists(newRestaurant.nameJp, onNameJpChange)}
        </div>
        <div className='website'>
          <label>Website</label>
          {inputIfValueExists(newRestaurant.website, onWebsiteChange)}
        </div>
        <div className='geolocation'>
          <label>geolocation </label>
          <span className='lat'>
            <label>Lat</label>
            {inputIfValueExists(newRestaurant.geolocation ? newRestaurant.geolocation.lat : null, onGeolocationLatChange)}
          </span>
          <span className='long'>
            <label>Long</label>
            {inputIfValueExists(newRestaurant.geolocation ? newRestaurant.geolocation.long : null, onGeolocationLongChange)}
          </span>
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
