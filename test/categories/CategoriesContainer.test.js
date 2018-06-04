import React from 'react'
import CategoriesContainer from '../../src/js/categories/CategoriesContainer'
import * as httpFetcher from '../../src/js/fetchers/httpFetcher'
import {mockPromise, mountContainer} from '../helper'

describe('CategoriesContainer', () => {
  beforeEach(() => jest.restoreAllMocks())
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

  it('sends post request with category on save button click', () => {
    jest.spyOn(httpFetcher, 'httpGet').mockImplementation(() => mockPromise([]))
    const httpPostSpy = jest.spyOn(httpFetcher, 'httpPost').mockImplementation(() => mockPromise([]))
    const categoriesContainer = mountContainer(CategoriesContainer)


    categoriesContainer.find('.name input').simulate('change', {target: { value: 'new name'}})
    categoriesContainer.find('button.save').simulate('click')


    expect(httpPostSpy.mock.calls[0][1]).toEqual({"id": "", "name": "new name", "restaurants": []})
  })

  it('displays error message for duplicate key exception', () => {
    jest.spyOn(httpFetcher, 'httpGet').mockImplementation(() => mockPromise([]))
    jest.spyOn(httpFetcher, 'httpPost')
      .mockImplementation(() => mockPromise({error: 'DUPLICATE_KEY_EXCEPTION'}))
    const categoriesContainer = mountContainer(CategoriesContainer)

    expect(categoriesContainer.text()).not.toContain('is already taken')


    categoriesContainer.find('.name input').simulate('change', {target: { value: 'new name'}})
    categoriesContainer.find('button.save').simulate('click')


    expect(categoriesContainer.text()).toContain('new name is already taken')
  })
})
