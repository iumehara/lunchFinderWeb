// @flow
import React from 'react'
import type {CategoryType} from './CategoryTypes'
import MultipleMarkerMap from '../maps/MultipleMarkerMap'
import RestaurantList from '../restaurants/RestaurantList'

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

    return (
      <div className='category'>
        <div className='main'>
          <RestaurantList
            category={category}
            restaurants={category.restaurants}
          />
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
