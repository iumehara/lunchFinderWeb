import React from 'react'
import Map from '../../src/js/maps/Map'
import {shallow} from 'enzyme'
import * as libraryLoader from '../../src/js/fetchers/libraryLoader'
import * as googleMapsWrapper from '../../src/js/wrappers/googleMapsWrapper'

describe('Map', () => {
  beforeEach(() => jest.restoreAllMocks())

  it('initializes google map with correct arguments', () => {
    jest.spyOn(libraryLoader, 'loadGoogleMaps')
      .mockImplementation(() => {
        return {then: callbackFunc => callbackFunc()}
      })

    jest.spyOn(googleMapsWrapper, 'initCenteredGoogleMap')
      .mockImplementation(() => 'fake-map')

    const initGoogleMapsMarkerSpy = jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker')
      .mockImplementation(() => {})


    const map = shallow(<Map/>)
    map.setProps({restaurant: {geolocation: {lat: 33, long: 11}}})


    expect(initGoogleMapsMarkerSpy.mock.calls[0][0]).toEqual({lat: 33, lng: 11})
    expect(initGoogleMapsMarkerSpy.mock.calls[0][1]).toEqual('fake-map')
  })

  it('does not load google map if props are not updated', () => {
    const loadGoogleMapsSpy = jest.spyOn(libraryLoader, 'loadGoogleMaps')


    const map = shallow(<Map/>)


    expect(loadGoogleMapsSpy).not.toHaveBeenCalled()
  })

  it('does not initialize google map or marker if new props does not include gooLocation', () => {
    jest.spyOn(libraryLoader, 'loadGoogleMaps')
      .mockImplementation(() => {
        return {then: callbackFunc => callbackFunc()}
      })

    const initCenteredGoogleMapSpy = jest.spyOn(googleMapsWrapper, 'initCenteredGoogleMap')
    const initGoogleMapsMarkerSpy = jest.spyOn(googleMapsWrapper, 'initGoogleMapsMarker')


    const map = shallow(<Map/>)
    map.setProps({restaurant: {notgeolocation: ''}})


    expect(initCenteredGoogleMapSpy).not.toHaveBeenCalled()
    expect(initGoogleMapsMarkerSpy).not.toHaveBeenCalled()
  })
})
