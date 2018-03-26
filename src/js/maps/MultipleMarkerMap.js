// @flow
import React from 'react'
import {initGoogleMap, initGoogleMapsBounds, initGoogleMapsMarker} from '../wrappers/googleMapsWrapper'
import {loadGoogleMaps} from '../fetchers/libraryLoader'
import type {BasicRestaurantType} from '../restaurants/RestaurantTypes'
import {StartingPointMarker} from './StartingPointMarker'

type Props = {
  id: string,
  restaurants: Array<BasicRestaurantType>
}

export default class MultipleMarkerMap extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.id != this.props.id) {
      this.loadMap(nextProps.restaurants)
    }
  }

  loadMap(restaurants: Array<BasicRestaurantType>) {
    loadGoogleMaps()
      .then(() => {
        const map = initGoogleMap()
        const bounds = initGoogleMapsBounds()
        let marker = StartingPointMarker(map)
        bounds.extend(marker.position)

        restaurants.forEach(restaurant => {
          if (restaurant.geolocation) {
            const position = {lat: restaurant.geolocation.lat, lng: restaurant.geolocation.long}
            const label = {text: restaurant.name}
            marker = initGoogleMapsMarker({map, position, label})
            bounds.extend(marker.position)
          }
        })

        map.fitBounds(bounds)
      })
  }

  render() {
    return <div id="map"></div>
  }
}
