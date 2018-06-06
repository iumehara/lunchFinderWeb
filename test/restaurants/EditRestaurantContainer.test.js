import React from 'react'
import EditRestaurantContainer from '../../src/js/restaurants/EditRestaurantContainer'
import * as httpFetcher from '../../src/js/fetchers/httpFetcher'
import * as resourceFetcher from '../../src/js/fetchers/resourceFetcher'
import * as windowWrapper from '../../src/js/wrappers/windowWrapper'
import {mockPromise, mountContainer} from '../helper'

describe('EditRestaurantContainer', () => {
  beforeEach(() => jest.restoreAllMocks())

  describe('update', () => {
    let httpPutSpy
    beforeEach(() => {
      const mockCategories = [{id: 1, name: 'Sushi'}, {id: 2, name: 'Pizza'}, {id: 3, name: 'Spicy'}]
      jest.spyOn(resourceFetcher, 'getCategories').mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(mockCategories)}
      })

      httpPutSpy = jest.spyOn(httpFetcher, 'httpPut').mockImplementation(() => {
        return {then: ()=>{}}
      })
    })

    it('submits update with no changes', () => {
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

      jest.spyOn(resourceFetcher, 'getRestaurant').mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(mockRestaurant)}
      })
      const editRestaurantContainer = mountContainer(EditRestaurantContainer, {id: '25'})


      editRestaurantContainer.find('button.save').simulate('click')


      expect(httpPutSpy.mock.calls.length).toBe(1)
      expect(httpPutSpy.mock.calls[0][0]).toContain('/restaurants/25')
      expect(httpPutSpy.mock.calls[0][1].id).toEqual(25)
      expect(httpPutSpy.mock.calls[0][1].name).toEqual('Pintokona')
      expect(httpPutSpy.mock.calls[0][1].nameJp).toEqual('ぴんとこな')
      expect(httpPutSpy.mock.calls[0][1].website).toEqual('www.default.example.com')
      expect(httpPutSpy.mock.calls[0][1].geolocation.lat).toEqual(1.0)
      expect(httpPutSpy.mock.calls[0][1].geolocation.long).toEqual(2.0)
      expect(httpPutSpy.mock.calls[0][1].categoryIds).toEqual([1])
    })

    it('submits update on restaurant with only required fields', () => {
      const mockRestaurant = {
        id: 25,
        name: 'Pintokona',
        nameJp: 'ぴんとこな',
        categories: []
      }
      jest.spyOn(resourceFetcher, 'getRestaurant')
        .mockImplementation(() => mockPromise(mockRestaurant))

      const editRestaurantContainer = mountContainer(EditRestaurantContainer, {id: '25'})


      editRestaurantContainer.find('.name input').simulate('change', {target: {name: 'name', value: 'Pintokona!'}})
      editRestaurantContainer.find('.name-jp input').simulate('change', {target: {name: 'nameJp', value: 'ぴんとこな!'}})
      editRestaurantContainer.find('button.save').simulate('click')


      expect(httpPutSpy.mock.calls.length).toBe(1)
      expect(httpPutSpy.mock.calls[0][0]).toContain('/restaurants/25')
      expect(httpPutSpy.mock.calls[0][1].id).toEqual(25)
      expect(httpPutSpy.mock.calls[0][1].name).toEqual('Pintokona!')
      expect(httpPutSpy.mock.calls[0][1].nameJp).toEqual('ぴんとこな!')
      expect(httpPutSpy.mock.calls[0][1].categoryIds).toEqual([])
    })

    it('submits update on restaurant with all fields', () => {
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
      jest.spyOn(resourceFetcher, 'getRestaurant').mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(mockRestaurant)}
      })

      const editRestaurantContainer = mountContainer(EditRestaurantContainer, {id: '25'})


      editRestaurantContainer.find('.name input').simulate('change', {target: {name: 'name', value: 'Pintokona!'}})
      editRestaurantContainer.find('.name-jp input').simulate('change', {target: {name: 'nameJp', value: 'ぴんとこな!'}})
      editRestaurantContainer.find('.website input').simulate('change', {target: {name: 'website', value: 'www.pintokona.example.com'}})
      editRestaurantContainer.find('.categories select').simulate('change', {target: {value: '2'}})
      editRestaurantContainer.find('button.save').simulate('click')


      expect(httpPutSpy.mock.calls.length).toBe(1)
      expect(httpPutSpy.mock.calls[0][0]).toContain('/restaurants/25')
      expect(httpPutSpy.mock.calls[0][1].id).toEqual(25)
      expect(httpPutSpy.mock.calls[0][1].name).toEqual('Pintokona!')
      expect(httpPutSpy.mock.calls[0][1].nameJp).toEqual('ぴんとこな!')
      expect(httpPutSpy.mock.calls[0][1].categoryIds).toEqual([1, 2])
    })
  })

  describe('delete', () => {
    it('submits delete to correct route', () => {
      jest.spyOn(resourceFetcher, 'getCategories').mockImplementation(() => {
        return {then: callbackFunc => callbackFunc([])}
      })

      jest.spyOn(resourceFetcher, 'getRestaurant').mockImplementation(() => {
        return {then: callbackFunc => callbackFunc({categories: []})}
      })

      const httpDeleteSpy = jest.spyOn(httpFetcher, 'httpDelete').mockImplementation(() => {
        return {then: callbackFunc => callbackFunc()}
      })

      const confirmSpy = jest.spyOn(windowWrapper, 'confirm').mockImplementation(() => true)

      const editRestaurantContainer = mountContainer(EditRestaurantContainer, {id: '25'})

      editRestaurantContainer.find('button.delete').simulate('click')

      expect(confirmSpy.mock.calls.length).toBe(1)
      expect(httpDeleteSpy.mock.calls.length).toBe(1)
      expect(httpDeleteSpy.mock.calls[0][0]).toContain('/restaurants/25')
    })
  })
})
