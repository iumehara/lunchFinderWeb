import React from 'react'
import NewRestaurantContainer from '../../src/js/restaurants/NewRestaurantContainer'
import * as httpGet from '../../src/js/httpGet'
import { mountContainer, mountedContainerHistory } from '../helper'

describe('NewRestaurantContainer', () => {
  it('displays newRestaurant list from request', () => {
    const mockCategories = [{id: 1, name: 'Sushi'}, {id: 2, name: 'Pizza'}, {id: 3, name: 'Spicy'}]

    jest.spyOn(httpGet, 'httpGet')
      .mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(mockCategories)}
      })

    const httpPostSpy = jest.spyOn(httpGet, 'httpPost')
      .mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(25)}
      })

    const newRestaurantContainer = mountContainer(NewRestaurantContainer)

    newRestaurantContainer.find('.name input').simulate('change', {target: {value: 'Pintokona'}})
    newRestaurantContainer.find('.name-jp input').simulate('change', {target: {value: 'ぴんとこな'}})
    newRestaurantContainer.find('.categories select').simulate('change', {target: {value: '1'}})
    newRestaurantContainer.find('.categories select').simulate('change', {target: {value: '2'}})
    newRestaurantContainer.find('.categories select').simulate('change', {target: {value: '3'}})
    newRestaurantContainer.find('.category2 button.remove').simulate('click')
    newRestaurantContainer.find('button.save').simulate('click')

    expect(httpPostSpy).toHaveBeenCalledWith(
      "http://localhost:8080/restaurants/",
      {name: 'Pintokona', nameJp: 'ぴんとこな', categoryIds: [1, 3]}
    )
    expect(mountedContainerHistory(newRestaurantContainer)).toContain('/restaurants/25')
  })
})
