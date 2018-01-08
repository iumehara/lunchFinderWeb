import React from 'react'
import { Link } from 'react-router-dom'

const CategoryLink = props => (
  <Link className='category-link' to={`/categories/${props.category.id}`}>
    {props.category.name}
  </Link>
)

export default CategoryLink
