import React from 'react'
import {mountContainer} from '../helper'
import * as httpFetcher from '../../src/js/fetchers/httpFetcher'
import * as resourceFetcher from '../../src/js/fetchers/resourceFetcher'
import EditCategoryContainer from '../../src/js/categories/EditCategoryContainer'

describe('EditCategoryContainer', () => {
  it('adds restaurant to category', () => {
    const mockCategory = {
      id: 3,
      name: 'Pizza',
      restaurants: [{id: 1, name: 'Pizzakaya', categoryIds: [1, 2]}]
    }
    const getCategorySpy = jest.spyOn(resourceFetcher, 'getCategory').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc(mockCategory)}
    })

    const mockRestaurants = [
      {id: 1, name: 'Pizzakaya', categories: [{id: 3, name: 'Pizza'},{id: 4, name: 'Spicy'}]},
      {id: 2, name: 'Moti', categories: [{id: 5, name: 'Curry'},{id: 4, name: 'Spicy'}]}
    ]
    jest.spyOn(resourceFetcher, 'getRestaurants').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc(mockRestaurants)}
    })

    const httpPutSpy = jest.spyOn(httpFetcher, 'httpPut').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc({})}
    })


    const editCategoryContainer = mountContainer(EditCategoryContainer, {id: '3'})


    editCategoryContainer.find('select.restaurants').simulate('change', {target: {value: 2}})
    editCategoryContainer.find('button.add-category').simulate('click')
    expect(httpPutSpy.mock.calls[0][0]).toEqual('http://localhost:8080/restaurants/2/categories/3')
    expect(getCategorySpy.mock.calls.length).toBe(2)
  })
})
