// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import type { CategoryType } from './CategoryTypes'

type Props = {
  category: CategoryType,
}

const CategoryLink = (props: Props) => (
  <Link className='category-link' to={`/categories/${props.category.id}`}>
    {props.category.name}
  </Link>
)

export default CategoryLink
