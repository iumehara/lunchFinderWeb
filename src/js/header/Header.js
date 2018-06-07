// @flow
import React from 'react'
import type {CategoryType} from '../categories/CategoryTypes'
import CategoryLink from '../categories/CategoryLink'

type Props = {
  categories: [CategoryType],
  fetchCategories: () => {}
}

class Header extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const categories = this.props.categories.map((category, i) => {
      return <CategoryLink key={i} category={category}/>
    })

    return (
      <div>
        <ul>
          {categories}
        </ul>
      </div>
    )
  }
}

export default Header
