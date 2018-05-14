// @flow
import React from 'react'
import type {NewRestaurantType} from './RestaurantTypes'
import MarkableMap from '../maps/MarkableMap'

type Props = {
  categories: [],
  newRestaurant: NewRestaurantType,
  editMode: boolean,
  fetchCategories: () => {},
  onRemoveCategory: () => {},
  onInputChange: (fieldObject: Object) => {},/**/
  onGeolocationChange: (geolocation: Object) => {},
  onCategoryChange: () => {},
  saveButtonWasClicked: () => {}
}

export default class RestaurantForm extends React.Component<Props> {
  componentDidMount() {
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

    const inputIfValueExists = (value, onChange) => {
      if(this.props.editMode) {
        if (this.props.formDataLoaded) {
          return <input onChange={onChange} defaultValue={value}/>
        }
      } else {
        return <input onChange={onChange}/>
      }
    }

    const onNameChange = e => this.props.onInputChange({name: e.target.value})
    const onNameJpChange = e => this.props.onInputChange({nameJp: e.target.value})
    const onWebsiteChange = e => this.props.onInputChange({website: e.target.value})
    const onMapChange = geolocation => this.props.onGeolocationChange(geolocation)

    const newRestaurant = this.props.newRestaurant

    const map = () => {
      let geolocation
      if (newRestaurant.geolocation && newRestaurant.geolocation.lat && newRestaurant.geolocation.long) {
        geolocation = {lat: newRestaurant.geolocation.lat, long: newRestaurant.geolocation.long}
      }
      return <MarkableMap geolocation={geolocation} onMapChange={onMapChange}/>
    }

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
        <div className='categories'>
          <label>categories</label>
          <select name="text" onChange={this.props.onCategoryChange}>{categoryOptions}</select>
          <ul>
            {selectedCategories}
          </ul>
        </div>
        {map()}

        <button className='save' onClick={this.props.saveButtonWasClicked}>save</button>
      </div>
    )
  }
}
