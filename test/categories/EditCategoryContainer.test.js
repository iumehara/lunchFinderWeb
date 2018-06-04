import React from 'react'
import {mockPromise, mountContainer} from '../helper'
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
    expect(httpPutSpy.mock.calls[0][0]).toContain('/restaurants/2/categories/3')
    expect(getCategorySpy.mock.calls.length).toBe(2)
  })

  describe('delete button', () => {
    it('does not get displayed if the category has restaurants', () => {
      jest.spyOn(resourceFetcher, 'getRestaurants').mockImplementation(() => mockPromise([]))
      const mockCategoryWithRestaurants = {
        id: 3,
        name: 'Pizza',
        restaurants: [{id: 1, name: 'Pizzakaya', categories: []}]
      }
      jest.spyOn(resourceFetcher, 'getCategory')
        .mockImplementation(() => mockPromise(mockCategoryWithRestaurants))


      const editCategoryContainer = mountContainer(EditCategoryContainer, {id: '3'})


      expect(editCategoryContainer.find('button.delete').length).toBe(0)
    })

    it('gets displayed if the category has no restaurants', () => {
      jest.spyOn(resourceFetcher, 'getRestaurants').mockImplementation(() => mockPromise([]))

      const mockCategoryWithNoRestaurants = {
        id: 3,
        name: 'Pizza',
        restaurants: []
      }
      jest.spyOn(resourceFetcher, 'getCategory')
        .mockImplementation(() => mockPromise(mockCategoryWithNoRestaurants))


      const editCategoryContainer = mountContainer(EditCategoryContainer, {id: '3'})


      expect(editCategoryContainer.find('button.delete').length).toBe(1)
    })

    it('calls delete function when it is clicked', () => {
      jest.spyOn(resourceFetcher, 'getRestaurants').mockImplementation(() => mockPromise([]))
      const destroyCategorySpy = jest.spyOn(resourceFetcher, 'destroyCategory')
        .mockImplementation(() => mockPromise({}))

      const mockCategoryWithNoRestaurants = {
        id: 3,
        name: 'Pizza',
        restaurants: []
      }
      jest.spyOn(resourceFetcher, 'getCategory')
        .mockImplementation(() => mockPromise(mockCategoryWithNoRestaurants))


      const editCategoryContainer = mountContainer(EditCategoryContainer, {id: '3'})


      editCategoryContainer.find('button.delete').simulate('click')


      expect(destroyCategorySpy.mock.calls[0][0]).toEqual('3')
    })
  })
})
