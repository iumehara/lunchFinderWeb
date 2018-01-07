import React from 'react'
import { Link } from 'react-router-dom'
import CategoryLink from './CategoryLink'

class Category extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id != this.props.match.params.id) {
      nextProps.fetchCategory()
    }
  }

  componentWillMount() {
    this.props.fetchCategory()
  }

  render() {
    const category = this.props.category

    return (
      <div>
        <h1 className='title'>{category.name}</h1>
        <ul>
          {
            category.restaurants.map((restaurant, i) => {
              return (
                <li key={i}>
                  <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
                  ({restaurant.categories.map((category, i) => <CategoryLink key={i} category={category}/>)})
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Category
