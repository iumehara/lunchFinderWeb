import React from 'react'
import RestaurantContainer from '../../src/js/restaurants/RestaurantContainer'
import * as resourceFetcher from '../../src/js/fetchers/resourceFetcher'
import {mountContainer} from '../helper'

describe('RestaurantContainer', () => {
  beforeEach(() => {
    jest.restoreAllMocks()

    const mockRestaurant = {
      id: 25,
      name: 'Pintokona',
      nameJp: 'ぴんとこな',
      website: 'www.default.example.com',
      geolocation: {
        lat: 1.0,
        long: 2.0
      },
      categories: [{id: 1, name: 'Sushi'}]
    }

    jest.spyOn(resourceFetcher, 'getRestaurant').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc(mockRestaurant)}
    })
  })

  describe('restaurant list', () => {
    it('displays title', () => {
      const restaurantContainer = mountContainer(RestaurantContainer, {id: '25'})


      expect(restaurantContainer.find('.restaurant-list').text()).toContain('Restaurants')
    })

    it('displays restaurant', () => {
      const restaurantContainer = mountContainer(RestaurantContainer, {id: '25'})


      expect(restaurantContainer.find('.restaurant-list').text()).toContain('Pintokona')
      expect(restaurantContainer.find('.restaurant-list').text()).toContain('ぴんとこな')
      expect(restaurantContainer.find('.restaurant-list').text()).toContain('Sushi')
    })
  })

  describe('map', () => {
    it('displays title', () => {
      const restaurantContainer = mountContainer(RestaurantContainer, {id: '25'})


      expect(restaurantContainer.find('.details').text()).toContain('Pintokona')
      expect(restaurantContainer.find('.restaurant-list').text()).toContain('ぴんとこな')
    })

    it('renders map with correct props', () => {
      const restaurantContainer = mountContainer(RestaurantContainer, {id: '25'})


      expect(restaurantContainer.find('.details').find('SingleMarkerMap').length).toEqual(1)
      expect(restaurantContainer.find('.details').find('SingleMarkerMap').props().restaurant)
        .toEqual(
          {
            id: 25,
            name: 'Pintokona',
            nameJp: 'ぴんとこな',
            website: 'www.default.example.com',
            geolocation: {
              lat: 1.0,
              long: 2.0
            },
            categories: [{id: 1, name: 'Sushi'}]
          }
        )
    })
  })
})
