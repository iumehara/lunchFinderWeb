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
    jest.spyOn(googleMapsWrapper, 'initGoogleMap').mockImplementation(() => mockMap)
    jest.spyOn(googleMapsWrapper, 'initGoogleMapsBounds').mockImplementation(() => {return {extend: () => {}}})
  })

  it('sets starting point marker', () => {
    const initGoogleMapsMarkerSpy = jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker').mockImplementation(options => options)


    const multipleMarkerMap = shallow(<MultipleMarkerMapComponent restaurants={[]} history={{history: {push: []}}}/>)
    multipleMarkerMap.setProps({id: 1, restaurants: []})


    expect(initGoogleMapsMarkerSpy.mock.calls.length).toBe(1)
    expect(initGoogleMapsMarkerSpy.mock.calls[0][0])
      .toEqual({ position: { lat: 35.66048, lng: 139.729247 }, map: mockMap, label: { text: 'Roppongi Hills' } })
  })

  it('sets current restaurant markers', () => {
    const clickListenerSpy = jest.fn()
    const initGoogleMapsMarkerSpy = jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker')
      .mockImplementation(options => {
        options.addListener = clickListenerSpy
        return options
      })


    const multipleMarkerMap = shallow(<MultipleMarkerMapComponent restaurants={[]} history={{history: {push: []}}}/>)
    const id = 1
    const currentRestaurant = {id: 1, name: 'Pintokona', geolocation: {lat: 33, long: 111}}
    const restaurants = [currentRestaurant]
    multipleMarkerMap.setProps({id, restaurants, restaurant: currentRestaurant})


    expect(clickListenerSpy.mock.calls.length).toBe(0)

    expect(initGoogleMapsMarkerSpy.mock.calls.length).toBe(2)
    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].position).toEqual({lat: 33, lng: 111 })
    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].map).toEqual(mockMap)
    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].label).toEqual({text: 'Pintokona'})
    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].icon).toEqual('test-file-stub')
  })

  it('sets additional restaurant markers', () => {
    const clickListenerSpy = jest.fn()
    const initGoogleMapsMarkerSpy = jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker')
      .mockImplementation(options => {
        options.addListener = clickListenerSpy
        return options
      })


    const multipleMarkerMap = shallow(<MultipleMarkerMapComponent restaurants={[]} history={{history: {push: []}}}/>)
    multipleMarkerMap.setProps({id: 1, restaurants: [{id: 1, name: 'Pintokona', geolocation: {lat: 33, long: 111}}]})


    expect(clickListenerSpy.mock.calls.length).toBe(1)

    expect(initGoogleMapsMarkerSpy.mock.calls.length).toBe(2)
    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].position).toEqual({lat: 33, lng: 111 })
    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].map).toEqual(mockMap)
    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].label).toEqual({text: 'Pintokona'})
    expect(initGoogleMapsMarkerSpy.mock.calls[1][0].icon).toEqual('test-file-stub')
  })

  it('sets correct bounds', () => {
    const mapBouds = []
    jest.spyOn(googleMapsWrapper, 'initGoogleMapsBounds')
      .mockImplementation(() => {return {extend: bounds => mapBouds.push(bounds)}})

    const clickListenerSpy = jest.fn()
    jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker')
      .mockImplementation(options => {
        options.addListener = clickListenerSpy
        return options
      })


    const multipleMarkerMap = shallow(<MultipleMarkerMapComponent restaurants={[]} history={{history: {push: []}}}/>)
    multipleMarkerMap.setProps({id: 1, restaurants: [{id: 1, name: 'Pintokona', geolocation: {lat: 33, long: 111}}]})


    expect(mapBouds).toEqual([{ lat: 35.66048, lng: 139.729247 }, { lat: 33, lng: 111 }])
  })

  it('does not load google map if props are not updated', () => {
    const loadGoogleMapsSpy = jest.spyOn(libraryLoader, 'loadGoogleMaps')


    shallow(<MultipleMarkerMapComponent history={{history: {push: []}}}/>)


    expect(loadGoogleMapsSpy).not.toHaveBeenCalled()
  })
})
