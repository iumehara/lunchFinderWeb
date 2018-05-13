import React from 'react'
import CategoryContainer from '../../src/js/categories/CategoryContainer'
import {mountContainer} from '../helper'
import * as resourceFetcher from '../../src/js/fetchers/resourceFetcher'

describe('CategoryContainer', () => {
  beforeEach(() => {
    jest.restoreAllMocks()

    const mockCategory = {
      id: 3,
      name: 'Pizza',
      restaurants: [{id: 1, name: 'Pizzakaya', categoryIds: [1, 2]}]
    }
    jest.spyOn(resourceFetcher, 'getCategory').mockImplementation(() => {
      return {then: callbackFunc => callbackFunc(mockCategory)}
    })
  })

  describe('restaurant list', () => {
    it('displays title', () => {
      const categoryContainer = mountContainer(CategoryContainer, {id: '3'})


      expect(categoryContainer.find('.restaurant-list').text()).toContain('Pizza')
      expect(categoryContainer.find('.restaurant-list').text()).toContain('Restaurants')
    })

    it('displays restaurants', () => {
      const categoryContainer = mountContainer(CategoryContainer, {id: '3'})


      expect(categoryContainer.find('.restaurant-list').text()).toContain('Pizzakaya')
      expect(categoryContainer.find('.restaurant-list').text()).toContain('2 categories')
    })
  })

  describe('map', () => {
    it('renders map with correct props', () => {
      const categoryContainer = mountContainer(CategoryContainer, {id: '3'})


      expect(categoryContainer.find('MultipleMarkerMap').length).toEqual(1)
      expect(categoryContainer.find('MultipleMarkerMap').props().id).toEqual(3)
      expect(categoryContainer.find('MultipleMarkerMap').props().restaurants)
        .toEqual([{id: 1, name: 'Pizzakaya', categoryIds: [1, 2]}])
    })
  })
})
