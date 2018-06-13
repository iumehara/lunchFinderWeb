// @flow
import React from 'react'
import type {CategoryType} from '../categories/CategoryTypes'
import CategoryLink from '../categories/CategoryLink'

type Props = {
  categories: [CategoryType],
  fetchCategories: () => {},
  onSelectChange: (event: any, categories: [CategoryType]) => {}
}

class Header extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCategories()
  }

  onChange(event: any) {
    this.props.onSelectChange(event, this.props.categories)
  }

  render() {
    const categories = this.props.categories.map((category, i) => {
      return <CategoryLink key={i} category={category}/>
    })

    return (
      <div className='header'>
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

export default Header
