import React from 'react'
import NewRestaurantContainer from '../../src/js/restaurants/NewRestaurantContainer'
import * as httpFetcher from '../../src/js/fetchers/httpFetcher'
import * as resourceFetcher from '../../src/js/fetchers/resourceFetcher'
import {mockPromise, mountContainer} from '../helper'

describe('NewRestaurantContainer', () => {
  it('displays newRestaurant list from request', () => {
    const mockCategories = [{id: 1, name: 'Sushi'}, {id: 2, name: 'Pizza'}, {id: 3, name: 'Spicy'}]
    jest.spyOn(resourceFetcher, 'getCategories').mockImplementation(() => mockPromise(mockCategories))

    const httpPostSpy = jest.spyOn(httpFetcher, 'httpPost').mockImplementation(() => mockPromise({id: 25}))

    jest.spyOn(resourceFetcher, 'getRestaurants').mockImplementation(() => mockPromise([]))

    const newRestaurantContainer = mountContainer(NewRestaurantContainer)

    newRestaurantContainer.find('.name input').simulate('change', {target: {name: 'name', value: 'Pintokona'}})
    newRestaurantContainer.find('.name-jp input').simulate('change', {target: {name: 'nameJp', value: 'ぴんとこな'}})
    newRestaurantContainer.find('.website input').simulate('change', {target: {name: 'website', value: 'www.pintokona.example.com'}})
    newRestaurantContainer.find('.categories select').simulate('change', {target: {value: '1'}})
    newRestaurantContainer.find('.categories select').simulate('change', {target: {value: '2'}})
    newRestaurantContainer.find('.categories select').simulate('change', {target: {value: '3'}})
    newRestaurantContainer.find('.category2 button.remove').simulate('click')
    newRestaurantContainer.find('button.save').simulate('click')


    expect(httpPostSpy.mock.calls[0][0]).toContain('/restaurants/')
    expect(httpPostSpy.mock.calls[0][1]).toEqual(
      {
        name: 'Pintokona',
        nameJp: 'ぴんとこな',
        website: 'www.pintokona.example.com',
        categoryIds: [1, 3]
      }
    )
  })
})
