// @flow
import React from 'react'
import {addGoogleClickListener, initCenteredGoogleMap, initGoogleMapsMarker} from '../wrappers/googleMapsWrapper'
import {loadGoogleMaps} from '../fetchers/libraryLoader'

type Props = {
  geolocation?: {lat?: number, long?: number},
  onMapChange: ({}) => {}
}

type State = {
  marker: any
}

export default class MarkableMap extends React.Component<Props, State> {
  componentDidMount() {
    this.loadMap()
  }

  loadMap() {
    loadGoogleMaps()
      .then(() => {
        const geolocation = this.props.geolocation
        let position = {lat: 35.660480, lng: 139.729247}
        if (geolocation && geolocation.lat && geolocation.long) {
          position = {lat: geolocation.lat, lng: geolocation.long}
        }

        const map = initCenteredGoogleMap(position)
        const marker = initGoogleMapsMarker({position, map})

        this.setState({marker})

        addGoogleClickListener(map, (event) => {
          const latLng = event.latLng
          addMarker(this.state.marker, latLng)

          this.props.onMapChange({
            lat: latLng.lat(),
            long: latLng.lng()
          })
        })
      })
  }

  render() {
    return (
      <div>
        <div>click on the map the mark the restaurant</div>
        <div id="map"/>
      </div>
    )
  }
}

const addMarker = (marker, location) => {
  marker.setPosition(location)
}
