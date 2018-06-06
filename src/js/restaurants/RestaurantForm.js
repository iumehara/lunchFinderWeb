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
  saveButtonWasClicked: () => {},
  resetForm: () => {}
}

export default class RestaurantForm extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCategories()
  }

  componentWillUnmount() {
    this.props.resetForm()
  }

  renderInput(name: string, value?: string) {
    const onChange = e => this.props.onInputChange({[e.target.name]: e.target.value})
    if(this.props.editMode) {
      if (this.props.formDataLoaded) {
        return <input name={name} onChange={onChange} defaultValue={value}/>
      }
    } else {
      return <input name={name} onChange={onChange}/>
    }
  }

  renderMarkableMap() {
    if (this.props.editMode) {
      if (this.props.formDataLoaded) {
        return <MarkableMap geolocation={this.props.newRestaurant.geolocation} onMapChange={this.props.onGeolocationChange}/>
      }
    } else {
      return <MarkableMap onMapChange={this.props.onGeolocationChange}/>
    }
  }

  renderCategorySelect() {
    const options = this.props.categories.map((category, i) => {
      return <option key={i + 1} value={category.id}>{category.name}</option>
    })
    options.unshift(<option key={0}>Select Category</option>)

    return (
      <select name="text" onChange={this.props.onCategoryChange}>
        {options}
      </select>
    )
  }

  renderSelectedCategories() {
    // if (this.props.editMode || this.props.formDataLoaded) {
      return this.props.newRestaurant.categoryIds.map(selectedId => {
        const categories = this.props.categories.filter(category => category.id === selectedId)
        const categoryName = categories.length > 0 ? categories[0].name : ''

        return (
          <li key={selectedId} className={`category${selectedId}`}>
            <button className='remove' value={selectedId} onClick={this.props.onRemoveCategory}>x</button>
            {categoryName}
          </li>
        )
      })
    // }
  }

  render() {
    return (
      <div>
        <div className='name'>
          <label>Name (English)</label>
          {this.renderInput('name', this.props.newRestaurant.name)}
        </div>
        <div className='name-jp'>
          <label>店名 (日本語)</label>
          {this.renderInput('nameJp', this.props.newRestaurant.nameJp)}
        </div>
        <div className='website'>
          <label>Website</label>
          {this.renderInput('website', this.props.newRestaurant.website)}
        </div>
        <div className='categories'>
          <label>categories</label>
          {this.renderCategorySelect()}
          <ul>
            {this.renderSelectedCategories()}
          </ul>
        </div>
        {this.renderMarkableMap()}

        <button className='action save' onClick={this.props.saveButtonWasClicked}>
          save
        </button>
      </div>
    )
  }
}
