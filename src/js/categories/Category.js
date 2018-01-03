import React from 'react'

class Category extends React.Component {
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
              return <li key={i}>{restaurant.name}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default Category
