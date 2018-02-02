// @flow

export type RestaurantType = {
  id: string,
  name: string,
  nameJp: string,
  website?: string,
  geolocation?: {
    lat?: number,
    long?: number
  },
  categories: []
}

export type NewRestaurantType = {
  name: string,
  nameJp: string,
  website?: string,
  geolocation?: {
    lat?: number,
    long?: number
  },
  categoryIds: []
}

export const defaultRestaurant = {
  id: '',
  name: '',
  nameJp: '',
  categories: []
}

export const defaultNewRestaurant = {
  name: '',
  nameJp: '',
  categoryIds: []
}
