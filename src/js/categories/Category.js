// @flow
import React from 'react'
import type {CategoryType} from './CategoryTypes'
import MultipleMarkerMap from '../maps/MultipleMarkerMap'
import RestaurantList from '../restaurants/RestaurantList'
import type {RestaurantType} from '../restaurants/RestaurantTypes'

type Props = {
  id: string,
  category: CategoryType,
  restaurants: Array<RestaurantType>,
  fetchCategory: (id: string) => {},
  fetchCategoryRestaurants: (id: string) => {}
}

class Category extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.id !== this.props.id) {
      this.fetchData(nextProps.id)
    }
  }

  componentDidMount() {
    this.fetchData(this.props.id)
  }

  fetchData(id: string) {
    this.props.fetchCategory(id)
    this.props.fetchCategoryRestaurants(id)
  }

  render() {
    const category = this.props.category

    return (
      <div className='main'>
        <RestaurantList
          category={category}
          restaurants={this.props.restaurants}
        />
        <div className='details'>
          <div className='title'>
            <h1>All {category.name} Restaurants</h1>
          </div>
          <MultipleMarkerMap id={category.id} restaurants={this.props.category.restaurants}/>
        </div>
      </div>
    )
  }
}

export default Category
