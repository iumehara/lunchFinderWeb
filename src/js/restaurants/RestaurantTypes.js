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

export type BasicRestaurantType = {
    id: string,
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

export const defaultBasicRestaurant = {
  id: '',
  name: '',
  nameJp: '',
  categoryIds: []
}

export const basicRestaurantBuilder = (restaurant: RestaurantType) => {
  const basicRestaurant = defaultBasicRestaurant
  Object.keys(defaultBasicRestaurant).forEach(key => {
    if (key === 'categoryIds') {
      basicRestaurant['categoryIds'] = restaurant.categories.map(category => category.id)
    } else {
      basicRestaurant[key] = restaurant[key]
    }
  })
  return basicRestaurant
}
