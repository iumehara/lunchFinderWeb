// @flow
import type {BasicRestaurantType} from "../restaurants/RestaurantTypes";

export type CategoryType = {
  id: string,
  name: string,
  restaurants: Array<BasicRestaurantType>
}

export const defaultCategory = {
  id: '',
  name: '',
  restaurants: []
}
