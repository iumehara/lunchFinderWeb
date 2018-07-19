// @flow
import React from 'react'
import type {CategoryType} from '../categories/CategoryTypes'
import CategoryLink from '../categories/CategoryLink'
import {Link} from 'react-router-dom'

type Props = {
  categories: [CategoryType],
  category: CategoryType,
  fetchCategories: () => {}
}

class SubHeader extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const categories = this.props.categories.map((category, i) => {
      const active = (category.id === this.props.category.id)
      return <CategoryLink key={i} category={category} active={active}/>
    })

    const allCategoriesStatus = this.props.category.id === '' ? 'active' : ''

    return (
      <div className='sub-header'>
        <div className='all-categories'>
          <Link className={`category-link ${allCategoriesStatus}`} to={`/restaurants`}>
            All
          </Link>
        </div>
        <div className='list'>
          {categories}
        </div>
      </div>
    )
  }
}

export default SubHeader
