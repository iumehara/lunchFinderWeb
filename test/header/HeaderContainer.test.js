import React from 'react'
import * as httpFetcher from '../../src/js/fetchers/httpFetcher'
import {mockPromise, mountContainer} from '../helper'
import SubHeaderContainer from '../../src/js/header/SubHeaderContainer'

describe('SubHeaderContainer', () => {
  beforeEach(() => jest.restoreAllMocks())
  it('displays categories list from request', () => {
    const mockCategories = [{name: 'Sushi'}, {name: 'Pizza'}]

    jest.spyOn(httpFetcher, 'httpGet')
      .mockImplementation(() => mockPromise(mockCategories))

    const headerContainer = mountContainer(SubHeaderContainer)

    const categoriesList = headerContainer.find('SubHeader').find('.list').text()

    expect(categoriesList).toContain('Sushi')
    expect(categoriesList).toContain('Pizza')
  })
})
