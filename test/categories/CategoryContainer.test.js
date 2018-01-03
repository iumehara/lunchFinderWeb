import React from 'react'
import { mount } from 'enzyme'
import CategoryContainer from '../../src/js/categories/CategoryContainer'
import { createStore } from 'redux'
import reducer from '../../src/js/reducer'
import * as httpGet from '../../src/js/httpGet'

describe('CategoryContainer', () => {
  it('displays category from request', () => {
    const mockCategory = {name: 'Sushi', restaurants: [{name: 'Pintokona'}]}

    jest.spyOn(httpGet, 'httpGet')
      .mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(mockCategory)}
      })

    const store = createStore(reducer)
    const categoryContainer = mount(<CategoryContainer match={{params: {id: '3'}}}/>, { context: { store } })

    const category = categoryContainer.find('Category')

    expect(category.find('.title').text()).toContain('Sushi')
    expect(category.find('ul').text()).toContain('Pintokona')
  })
})
