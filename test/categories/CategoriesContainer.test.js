import React from 'react'
import { mount } from 'enzyme'
import CategoriesContainer from '../../src/js/categories/CategoriesContainer'
import { createStore } from 'redux'
import reducer from '../../src/js/reducer'
import * as httpGet from '../../src/js/httpGet'

describe('CategoriesContainer', () => {
  it('displays categories list from request', () => {
    const mockCategories = [{name: 'Sushi'}, {name: 'Pizza'}]

    jest.spyOn(httpGet, 'httpGet')
      .mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(mockCategories)}
      })

    const store = createStore(reducer)
    const categoriesContainer = mount(<CategoriesContainer/>, { context: { store} })

    const categoriesList = categoriesContainer.find('Categories').find('ul').text()

    expect(categoriesList).toContain('Sushi')
    expect(categoriesList).toContain('Pizza')
  })
})
