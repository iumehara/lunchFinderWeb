// @flow

export type RestaurantType = {
  id: string,
  name: string,
  nameJp: string,
  categories: []
}

export type NewRestaurantType = {
  name: string,
  nameJp: string,
  categoryIds: []
}
