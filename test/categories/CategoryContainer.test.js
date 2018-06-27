import React from 'react'
import {mockPromise, mountContainer} from '../helper'
import CategoryContainer from '../../src/js/categories/CategoryContainer'
import * as resourceFetcher from '../../src/js/fetchers/resourceFetcher'

describe('CategoryContainer', () => {
  beforeEach(() => {
    jest.restoreAllMocks()

    const mockCategory = {
      id: 3,
      name: 'Pizza',
      restaurants: [{id: 1, name: 'Pizzakaya', categoryIds: [1, 2]}]
    }
    jest.spyOn(resourceFetcher, 'getCategory')
      .mockImplementation(() => mockPromise(mockCategory))

    const mockRestaurants = [
      {id: 1, name: 'Pizzakaya', categories: [{id: 1, name: 'Spicy'}, {id: 2, name: 'Pizza'}]}
    ]
    jest.spyOn(resourceFetcher, 'getCategoryRestaurants')
      .mockImplementation(() => mockPromise(mockRestaurants))
  })

  describe('restaurant list', () => {
    let restaurantListSection
    beforeEach(() => {
      const categoryContainer = mountContainer(CategoryContainer, {id: '3'})
      restaurantListSection = categoryContainer.find('.restaurant-list')
    })

    it('displays title', () => {
      expect(restaurantListSection.text()).toContain('Pizza')
      expect(restaurantListSection.text()).toContain('Restaurants')
    })

    it('displays restaurants', () => {
      expect(restaurantListSection.text()).toContain('Pizzakaya')
      expect(restaurantListSection.text()).toContain('Spicy | Pizza')
    })
  })

  describe('details section', () => {
    let detailsSection
    beforeEach(() => {
      const categoryContainer = mountContainer(CategoryContainer, {id: '3'})
      detailsSection = categoryContainer.find('.details')
    })

    it('displays title', () => {
      expect(detailsSection.text()).toContain('All Pizza Restaurants')
    })

    it('renders map with correct props', () => {
      expect(detailsSection.find('MultipleMarkerMap').length).toEqual(1)
      expect(detailsSection.find('MultipleMarkerMap').props().id).toEqual(3)
      expect(detailsSection.find('MultipleMarkerMap').props().restaurants)
        .toEqual([{id: 1, name: 'Pizzakaya', categoryIds: [1, 2]}])
    })
  })
})
