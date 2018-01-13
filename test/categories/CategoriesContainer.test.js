import React from 'react'
import CategoriesContainer from '../../src/js/categories/CategoriesContainer'
import * as httpFetcher from '../../src/js/fetchers/httpFetcher'
import { mountContainer } from '../helper'

describe('CategoriesContainer', () => {
  it('displays categories list from request', () => {
    const mockCategories = [{name: 'Sushi'}, {name: 'Pizza'}]

    jest.spyOn(httpFetcher, 'httpGet')
      .mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(mockCategories)}
      })

    const categoriesContainer = mountContainer(CategoriesContainer)

    const categoriesList = categoriesContainer.find('Categories').find('ul').text()

    expect(categoriesList).toContain('Sushi')
    expect(categoriesList).toContain('Pizza')
  })
})
