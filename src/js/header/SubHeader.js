// @flow
import React from 'react'
import type {CategoryType} from '../categories/CategoryTypes'
import CategoryLink from '../categories/CategoryLink'
import {Link} from 'react-router-dom'
import type {RestaurantType} from '../restaurants/RestaurantTypes'

type Props = {
  categories: [CategoryType],
  category: CategoryType,
  restaurants: [RestaurantType],
  fetchCategories: () => {},
  onSelectChange: (event: any, categories: [CategoryType]) => {}
}

class SubHeader extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCategories()
  }

  onChange(event: any) {
    this.props.onSelectChange(event, this.props.categories)
  }

  render() {
    const categories = this.props.categories.map((category, i) => {
      const active = (category.id === this.props.category.id)
      return <CategoryLink key={i} category={category} active={active}/>
    })

    const allCategoriesStatus = () => {
      if (this.props.category.id === '' && this.props.restaurants.length > 0) {
        return 'active'
      } else {
        return ''
      }
    }

    return (
      <div className='sub-header'>
        <div className='all-categories'>
          <Link className={`category-link ${allCategoriesStatus()}`} to={`/restaurants`}>
            All Categories
          </Link>
        </div>
        <div className='control'>
          <div className='title'>Order by:</div>
          <select onChange={this.onChange.bind(this)}>
            <option value='popularity'>popularity</option>
            <option value='name'>name</option>
          </select>
        </div>
        <div className='list'>
          {categories}
        </div>
      </div>
    )
  }
}

export default SubHeader
