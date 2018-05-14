// @flow
import React from 'react'
import RestaurantCardLink from '../restaurants/RestaurantCardLink'
import type {CategoryType} from './CategoryTypes'
import MultipleMarkerMap from '../maps/MultipleMarkerMap'
import CategoryLink from './CategoryLink'
import {Link} from 'react-router-dom'

type Props = {
  match: {params: {id: string}},
  category: CategoryType,
  fetchCategory: (id: string) => {}
}

class Category extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(nextProps.match.params.id)
    }
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id)
  }

  fetchData(id: string) {
    this.props.fetchCategory(id)
  }

  render() {
    const category = this.props.category
    const categoryRestaurants = category.restaurants.map((restaurant, i) => {
      return <RestaurantCardLink key={i} restaurant={restaurant} selected={false}/>
    })

    return (
      <div className='category'>
        <div className='main'>
          <div className='restaurant-list'>
            <div className='title'>
              <CategoryLink category={category}/>
              <h1>Restaurants</h1>
            </div>
            <div>
              {categoryRestaurants}
            </div>
            <br/>
            <Link to={`/categories/${category.id}/edit`}>Edit</Link>
          </div>
          <div className='details'>
            <div className='title'>
              <h1>All {category.name} Restaurants</h1>
            </div>
            <MultipleMarkerMap id={category.id} restaurants={category.restaurants}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Category
