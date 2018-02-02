import React from 'react'
import { initCenteredGoogleMap, initGoogleMapsMarker } from '../wrappers/googleMapsWrapper'
import { loadGoogleMaps } from '../fetchers/libraryLoader'

export default class Map extends React.Component {
  componentWillReceiveProps(nextProps) {
    loadGoogleMaps()
      .then(() => {
        if (nextProps.restaurant && nextProps.restaurant.geolocation) {
          const geolocation = nextProps.restaurant.geolocation
          const position = {lat: geolocation.lat, lng: geolocation.long}
          const map = initCenteredGoogleMap(position)
          initGoogleMapsMarker(position, map)
        }
      })
  }

  render() {
    return <div id="map"></div>
  }
}
