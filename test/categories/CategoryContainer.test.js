import React from 'react'
import CategoryContainer from '../../src/js/categories/CategoryContainer'
import { mountContainer } from '../helper'
import * as httpGet from '../../src/js/httpGet'

describe('CategoryContainer', () => {
  it('displays category from request', () => {
    const mockCategory = {name: 'Sushi', restaurants: [{name: 'Pintokona'}]}

    jest.spyOn(httpGet, 'httpGet')
      .mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(mockCategory)}
      })

    const categoryContainer = mountContainer(CategoryContainer, {id: '3'})

    const category = categoryContainer.find('Category')

    expect(category.find('.title').text()).toContain('Sushi')
    expect(category.find('ul').text()).toContain('Pintokona')
  })
})
