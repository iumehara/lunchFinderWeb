// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import type { CategoryType } from './CategoryTypes'

type Props = {
  category: CategoryType,
  active: boolean
}

const CategoryLink = (props: Props) => (
  <Link className={`category-link ${props.active ? 'active' : ''}`} to={`/categories/${props.category.id}`}>
    {props.category.name}
  </Link>
)

export default CategoryLink
