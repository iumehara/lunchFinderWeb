// @flow
import React from 'react'
import {addGoogleClickListener, initCenteredGoogleMap, initGoogleMapsMarker} from '../wrappers/googleMapsWrapper'
import {loadGoogleMaps} from '../fetchers/libraryLoader'

type Props = {
  geolocation?: {lat: number, long: number},
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
        let position = {lat: 35.660480, lng: 139.729247}
        if (this.props.geolocation) {
          position = {lat: this.props.geolocation.lat, lng: this.props.geolocation.long}
        }

        const map = initCenteredGoogleMap(position)
        const marker = initGoogleMapsMarker({position, map})

        this.setState({marker})

        addGoogleClickListener(map, (event) => {
          console.log('---- inside')
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
    return <div id="map"/>
  }
}

const addMarker = (marker, location) => {
  marker.setPosition(location)
}
