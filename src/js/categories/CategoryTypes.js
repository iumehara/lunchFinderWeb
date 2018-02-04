// @flow
import type { RestaurantType } from '../restaurants/RestaurantTypes'

export type CategoryType = {
  id: string,
  name: string,
  restaurants: Array<RestaurantType>
}

export const defaultCategory = {
  id: '',
  name: '',
  restaurants: []
}
