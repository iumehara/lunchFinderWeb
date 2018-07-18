import React from 'react'
import MultipleMarkerMap, {MultipleMarkerMapComponent} from '../../src/js/maps/MultipleMarkerMap'
import {shallow} from 'enzyme'
import * as libraryLoader from '../../src/js/fetchers/libraryLoader'
import * as googleMapsWrapper from '../../src/js/wrappers/googleMapsWrapper'

describe('MultipleMarkerMap', () => {
  let mockMap = {fitBounds: () => {}}
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.spyOn(libraryLoader, 'loadGoogleMaps').mockImplementation(() => {return {then: callbackFunc => callbackFunc()}})
    jest.spyOn(googleMapsWrapper, 'getGoogle').mockImplementation(() => {})
    jest.spyOn(googleMapsWrapper, 'initGoogleMap').mockImplementation(() => mockMap)
    jest.spyOn(googleMapsWrapper, 'initGoogleMapsBounds').mockImplementation(() => {return {extend: () => {}}})
  })

  it('sets starting point marker', () => {
    const initGoogleMapsMarkerSpy = jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker')
      .mockImplementation(options => options)


    shallow(<MultipleMarkerMapComponent restaurants={[]}/>)


    expect(initGoogleMapsMarkerSpy.mock.calls.length).toBe(1)
    expect(initGoogleMapsMarkerSpy.mock.calls[0][0])
      .toEqual({ position: { lat: 35.66048, lng: 139.729247 }, map: mockMap, label: { text: 'Roppongi Hills' } })
  })

  it('sets restaurant markers', () => {
    const addListenerSpy = jest.fn()
    const setIconSpy = jest.fn()
    const initGoogleMapsMarkerSpy = jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker')
      .mockImplementation(options => {
        options.addListener = addListenerSpy
        options.setIcon = setIconSpy
        return options
      })

    const id = 1
    const currentRestaurant = {id: 1, name: 'AAAAA', geolocation: {lat: 33, long: 111}}
    const restaurants = [currentRestaurant, {id: 2, name: 'BBBBB', geolocation: {lat: 33, long: 222}}]


    shallow(<MultipleMarkerMapComponent id={id} restaurant={currentRestaurant} restaurants={restaurants}/>)


    expect(addListenerSpy.mock.calls.length).toBe(1)

    expect(setIconSpy.mock.calls.length).toBe(2)

    expect(initGoogleMapsMarkerSpy.mock.calls.length).toBe(3)
    expect(initGoogleMapsMarkerSpy.mock.calls[0][0].position).toEqual({lat: 33, lng: 111 })
    expect(initGoogleMapsMarkerSpy.mock.calls[0][0].map).toEqual(mockMap)
    expect(initGoogleMapsMarkerSpy.mock.calls[0][0].label).toEqual({text: 'AAAAA'})

    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].position).toEqual({lat: 33, lng: 222 })
    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].map).toEqual(mockMap)
    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].label).toEqual({text: 'BBBBB'})

    expect(initGoogleMapsMarkerSpy.mock.calls[2][0].position).toEqual({lat: 35.66048, lng: 139.729247 })
    expect(initGoogleMapsMarkerSpy.mock.calls[2][0].map).toEqual(mockMap)
    expect(initGoogleMapsMarkerSpy.mock.calls[2][0].label).toEqual({text: 'Roppongi Hills'})
  })
})
