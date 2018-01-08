import React from 'react'
import CategoryContainer from '../../src/js/categories/CategoryContainer'
import { mountContainer } from '../helper'
import * as httpGet from '../../src/js/httpGet'

describe('CategoryContainer', () => {
  it('displays category from request', () => {
    const mockCategory = {
      id: 3,
      name: 'Pizza',
      restaurants: [{name: 'Pizzakaya', categories: [{name: 'Pizza'},{name: 'Spicy'}]}]
    }

    jest.spyOn(httpGet, 'httpGet')
      .mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(mockCategory)}
      })

    const categoryContainer = mountContainer(CategoryContainer, {id: '3'})

    const category = categoryContainer.find('Category')

    expect(category.find('h1.title').text()).toContain('Pizza')
    expect(category.find('.restaurant-card').text()).toContain('Pizzakaya')
    expect(category.find('.restaurant-card .categories').text()).toContain('Spicy')
    expect(category.find('.restaurant-card .categories').text()).toContain('Pizza')
  })
})
