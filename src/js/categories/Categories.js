import React from 'react'
import { Link } from 'react-router-dom'
import CategoryLink from './CategoryLink'

class Categories extends React.Component {
  componentWillMount() {
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
