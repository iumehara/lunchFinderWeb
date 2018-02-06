import React from 'react'
import { shallow } from 'enzyme'
import RestaurantContainer from '../../src/js/restaurants/RestaurantContainer'
import * as resourceFetcher from '../../src/js/fetchers/resourceFetcher'
import { mountContainer } from '../helper'

describe('RestaurantContainer', () => {
  beforeEach(() => jest.restoreAllMocks())

  it('submits update with no changes', () => {
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
    const restaurantContainer = mountContainer(RestaurantContainer, {id: '25'})


    expect(restaurantContainer.find('.title').text()).toContain('ぴんとこな(Pintokona)')
    expect(restaurantContainer.find('CategoryLink').length).toBe(1)
    expect(restaurantContainer.find('CategoryLink').props().category).toEqual({id: 1, name: 'Sushi'})
  })
})
