import React from 'react'
import NewRestaurantContainer from '../../src/js/restaurants/NewRestaurantContainer'
import * as httpFetcher from '../../src/js/fetchers/httpFetcher'
import * as resourceFetcher from '../../src/js/fetchers/resourceFetcher'
import { mountContainer, mountedContainerHistory } from '../helper'

describe('NewRestaurantContainer', () => {
  it('displays newRestaurant list from request', () => {
    const mockCategories = [{id: 1, name: 'Sushi'}, {id: 2, name: 'Pizza'}, {id: 3, name: 'Spicy'}]
    jest.spyOn(resourceFetcher, 'getCategories').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc(mockCategories)}
    })

    const httpPostSpy = jest.spyOn(httpFetcher, 'httpPost').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc({id: 25})}
    })

    const newRestaurantContainer = mountContainer(NewRestaurantContainer)

    newRestaurantContainer.find('.name input').simulate('change', {target: {value: 'Pintokona'}})
    newRestaurantContainer.find('.name-jp input').simulate('change', {target: {value: 'ぴんとこな'}})
    newRestaurantContainer.find('.website input').simulate('change', {target: {value: 'www.pintokona.example.com'}})
    newRestaurantContainer.find('.geolocation .lat input').simulate('change', {target: {value: 123.456}})
    newRestaurantContainer.find('.geolocation .long input').simulate('change', {target: {value: 987.654}})
    newRestaurantContainer.find('.categories select').simulate('change', {target: {value: '1'}})
    newRestaurantContainer.find('.categories select').simulate('change', {target: {value: '2'}})
    newRestaurantContainer.find('.categories select').simulate('change', {target: {value: '3'}})
    newRestaurantContainer.find('.category2 button.remove').simulate('click')
    newRestaurantContainer.find('button.save').simulate('click')

    expect(httpPostSpy).toHaveBeenCalledWith(
      "http://localhost:8080/restaurants/",
      {
        name: 'Pintokona',
        nameJp: 'ぴんとこな',
        website: 'www.pintokona.example.com',
        geolocation: {
          lat: 123.456,
          long: 987.654
        },
        categoryIds: [1, 3]
      }
    )
    expect(mountedContainerHistory(newRestaurantContainer)).toContain('/restaurants/25')
  })
})
