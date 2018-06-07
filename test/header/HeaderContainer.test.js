import React from 'react'
import * as httpFetcher from '../../src/js/fetchers/httpFetcher'
import {mockPromise, mountContainer} from '../helper'
import HeaderContainer from '../../src/js/header/HeaderContainer'

describe('HeaderContainer', () => {
  beforeEach(() => jest.restoreAllMocks())
  it('displays categories list from request', () => {
    const mockCategories = [{name: 'Sushi'}, {name: 'Pizza'}]

    jest.spyOn(httpFetcher, 'httpGet')
      .mockImplementation(() => mockPromise(mockCategories))

    const headerContainer = mountContainer(HeaderContainer)

    const categoriesList = headerContainer.find('Header').find('ul').text()

    expect(categoriesList).toContain('Sushi')
    expect(categoriesList).toContain('Pizza')
  })
})
