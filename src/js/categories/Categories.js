import React from 'react'

class Categories extends React.Component {
  componentWillMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div>
        <h1>Categories</h1>
        <ul>
          {this.props.categories.map((cat, i) => <li key={i}>{cat.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default Categories
