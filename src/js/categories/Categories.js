// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import CategoryLink from './CategoryLink'
import type { CategoryType } from './CategoryTypes'

type Props = {
  fetchCategories: () => {},
  categories: [CategoryType],
  onNameChange: () => {},
  createNewCategory: () => {}
}

class Categories extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const categories = this.props.categories.map((category, i) => {
      return <CategoryLink key={i} category={category}/>
    })

    return (
      <div>
        <h1 className='title'>Categories</h1>
        <ul>
          {categories}
        </ul>
        <div className='form'>
          <h1 className='title'>New Category</h1>
          <div className='name'>
            <label>name</label>
            <input onChange={this.props.onNameChange}/>
          </div>
          <button className='save' onClick={this.props.createNewCategory}>create</button>
        </div>
      </div>
    )
  }
}

export default Categories
