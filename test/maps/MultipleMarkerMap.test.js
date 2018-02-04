import React from 'react'
import MultipleMarkerMap from '../../src/js/maps/MultipleMarkerMap'
import {shallow} from 'enzyme'
import * as libraryLoader from '../../src/js/fetchers/libraryLoader'
import * as googleMapsWrapper from '../../src/js/wrappers/googleMapsWrapper'

describe('MultipleMarkerMap', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.spyOn(libraryLoader, 'loadGoogleMaps')
      .mockImplementation(() => {return {then: callbackFunc => callbackFunc()}})
  })

  it('sets default first marker', () => {
    const mockMap = {fitBounds: () => {}}
    jest.spyOn(googleMapsWrapper, 'initGoogleMap').mockImplementation(() => mockMap)
    jest.spyOn(googleMapsWrapper, 'initGoogleMapsBounds').mockImplementation(() => {return {extend: () => {}}})

    const initGoogleMapsMarkerSpy = jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker')
      .mockImplementation(options => options)


    const multipleMarkerMap = shallow(<MultipleMarkerMap restaurants={[]}/>)
    multipleMarkerMap.setProps({id: 1, restaurants: []})


    expect(initGoogleMapsMarkerSpy.mock.calls.length).toBe(1)
    expect(initGoogleMapsMarkerSpy.mock.calls[0][0])
      .toEqual({ position: { lat: 35.66048, lng: 139.729247 }, map: mockMap, label: { text: 'Roppongi Hills' } })
  })

  it('sets additional restaurant markers', () => {
    const mockMap = {fitBounds: () => {}}
    jest.spyOn(googleMapsWrapper, 'initGoogleMap').mockImplementation(() => mockMap)
    jest.spyOn(googleMapsWrapper, 'initGoogleMapsBounds').mockImplementation(() => {return {extend: () => {}}})

    const initGoogleMapsMarkerSpy = jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker')
      .mockImplementation(options => options)


    const multipleMarkerMap = shallow(<MultipleMarkerMap restaurants={[]}/>)
    multipleMarkerMap.setProps({id: 1, restaurants: [{id: 1, name: 'Pintokona', geolocation: {lat: 33, long: 111}}]})


    expect(initGoogleMapsMarkerSpy.mock.calls[1][0])
      .toEqual({ position: { lat: 33, lng: 111 }, map: mockMap, label: { text: 'Pintokona' }})
  })

  it('sets correct bounds', () => {
    jest.spyOn(googleMapsWrapper, 'initGoogleMap').mockImplementation(() => {return {fitBounds: () => {}}})

    const mapBouds = []
    jest.spyOn(googleMapsWrapper, 'initGoogleMapsBounds')
      .mockImplementation(() => {return {extend: bounds => mapBouds.push(bounds)}})

    const initGoogleMapsMarkerSpy = jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker')
      .mockImplementation(options => options)


    const multipleMarkerMap = shallow(<MultipleMarkerMap restaurants={[]}/>)
    multipleMarkerMap.setProps({id: 1, restaurants: [{id: 1, name: 'Pintokona', geolocation: {lat: 33, long: 111}}]})


    expect(mapBouds).toEqual([{ lat: 35.66048, lng: 139.729247 }, { lat: 33, lng: 111 }])
  })

  it('does not load google map if props are not updated', () => {
    const loadGoogleMapsSpy = jest.spyOn(libraryLoader, 'loadGoogleMaps')


    const map = shallow(<MultipleMarkerMap/>)


    expect(loadGoogleMapsSpy).not.toHaveBeenCalled()
  })
})
