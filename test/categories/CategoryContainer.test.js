import React from 'react'
import CategoryContainer from '../../src/js/categories/CategoryContainer'
import { mountContainer } from '../helper'
import * as httpGet from '../../src/js/httpFetcher'

describe('CategoryContainer', () => {
  beforeEach(() => jest.restoreAllMocks())

  it('displays category from request', () => {
    const mockCategory = {
      id: 3,
      name: 'Pizza',
      restaurants: [{id: 1, name: 'Pizzakaya', categories: [{name: 'Pizza'},{name: 'Spicy'}]}]
    }
    jest.spyOn(httpGet, 'getCategory').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc(mockCategory)}
    })

    const mockRestaurants = [
      {id: 1, name: 'Pizzakaya', categories: [{id: 3, name: 'Pizza'},{id: 4, name: 'Spicy'}]},
      {id: 2, name: 'Moti', categories: [{id: 5, name: 'Curry'},{id: 4, name: 'Spicy'}]}
    ]
    jest.spyOn(httpGet, 'getRestaurants').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc(mockRestaurants)}
    })

    const categoryContainer = mountContainer(CategoryContainer, {id: '3'})

    const category = categoryContainer.find('Category')

    expect(category.find('h1.title').text()).toContain('Pizza')
    expect(category.find('.restaurant-card').text()).toContain('Pizzakaya')
    expect(category.find('.restaurant-card .categories').text()).toContain('Spicy')
    expect(category.find('.restaurant-card .categories').text()).toContain('Pizza')
  })

  it('adds restaurant to category', () => {
    const mockCategory = {
      id: 3,
      name: 'Pizza',
      restaurants: [{id: 1, name: 'Pizzakaya', categories: [{name: 'Pizza'},{name: 'Spicy'}]}]
    }
    jest.spyOn(httpGet, 'getCategory').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc(mockCategory)}
    })

    const mockRestaurants = [
      {id: 1, name: 'Pizzakaya', categories: [{id: 3, name: 'Pizza'},{id: 4, name: 'Spicy'}]},
      {id: 2, name: 'Moti', categories: [{id: 5, name: 'Curry'},{id: 4, name: 'Spicy'}]}
    ]
    jest.spyOn(httpGet, 'getRestaurants').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc(mockRestaurants)}
    })

    const httpPutSpy = jest.spyOn(httpGet, 'httpPut').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc({})}
    })

    const categoryContainer = mountContainer(CategoryContainer, {id: '3'})

    const category = categoryContainer.find('Category')

    category.find('select.restaurants').simulate('change', {target: {value: 2}})
    category.find('button.add-category').simulate('click')
    expect(httpPutSpy.mock.calls[0][0]).toEqual('http://localhost:8080/restaurants/2/categories/3')
  })
})
