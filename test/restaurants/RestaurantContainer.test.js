import React from 'react'
import {mockPromise, mountContainer} from '../helper'
import RestaurantContainer from '../../src/js/restaurants/RestaurantContainer'
import * as resourceFetcher from '../../src/js/fetchers/resourceFetcher'
import MultipleMarkerMap from '../../src/js/maps/MultipleMarkerMap'

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

    jest.spyOn(resourceFetcher, 'getRestaurant')
      .mockImplementation(() => mockPromise(mockRestaurant))
  })

  describe('restaurant list', () => {
    let restaurantListSection
    beforeEach(() => {
      const restaurantContainer = mountContainer(RestaurantContainer, {id: '25'})
      restaurantListSection = restaurantContainer.find('.restaurant-list')
    })

    it('displays restaurant', () => {
      expect(restaurantListSection.text()).toContain('Pintokona')
      expect(restaurantListSection.text()).toContain('ぴんとこな')
      expect(restaurantListSection.text()).toContain('Sushi')
    })
  })

  describe('details section', () => {
    let detailsSection
    beforeEach(() => {
      const restaurantContainer = mountContainer(RestaurantContainer, {id: '25'})
      detailsSection = restaurantContainer.find('.details')
    })

    it('displays name', () => {
      expect(detailsSection.text()).toContain('Pintokona')
      expect(detailsSection.text()).toContain('ぴんとこな')
    })

    it('displays website', () => {
      expect(detailsSection.find('a.website').text()).toContain('www.default.example.com')
      expect(detailsSection.find('a.website').props().href).toContain('www.default.example.com')
    })

    it('displays map with correct props', () => {
      expect(detailsSection.find(MultipleMarkerMap).length).toEqual(1)
      expect(detailsSection.find(MultipleMarkerMap).props().restaurant)
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

    it('displays category links', () => {
      expect(detailsSection.find('a.category-link').length).toBe(1)
      expect(detailsSection.find('a.category-link').at(0).text()).toBe('Sushi')
      expect(detailsSection.find('a.category-link').at(0).props().href).toBe('#/categories/1')
    })

    it('displays edit link', () => {
      expect(detailsSection.find('a.edit-restaurant').text()).toBe('Edit Restaurant')
      expect(detailsSection.find('a.edit-restaurant').props().href).toBe('#/restaurants/25/edit')
    })
  })
})
