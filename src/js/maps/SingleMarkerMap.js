// @flow
import React from 'react'
import {initCenteredGoogleMap, initGoogleMapsMarker} from '../wrappers/googleMapsWrapper'
import {loadGoogleMaps} from '../fetchers/libraryLoader'
import type {RestaurantType} from '../restaurants/RestaurantTypes'

type Props = {
  restaurant: RestaurantType
}

export default class SingleMarkerMap extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.restaurant.id !== this.props.restaurant.id) {
      this.loadMap(nextProps.restaurant)
    }
  }

  loadMap(restaurant: RestaurantType) {
    loadGoogleMaps()
      .then(() => {
        if (restaurant.geolocation) {
          const geolocation = restaurant.geolocation
          const position = {lat: geolocation.lat, lng: geolocation.long}
          const map = initCenteredGoogleMap(position)
          initGoogleMapsMarker({position, map})
        }
      })
  }

  render() {
    return <div id="map"/>
  }
}
