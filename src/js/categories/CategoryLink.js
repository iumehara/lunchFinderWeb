import React from 'react'
import { Link } from 'react-router-dom'

export default class CategoryLink extends React.Component {
  render() {
    return (
      <Link to={`/categories/${this.props.category.id}`}>
        <span>{this.props.category.name}</span>
      </Link>
    )
  }
}
