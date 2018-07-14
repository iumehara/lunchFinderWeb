// @flow
import React from 'react'
import {initGoogleMap, initGoogleMapsBounds, initGoogleMapsMarker} from '../wrappers/googleMapsWrapper'
import {loadGoogleMaps} from '../fetchers/libraryLoader'
import type {BasicRestaurantType} from '../restaurants/RestaurantTypes'
import {StartingPointMarker} from './StartingPointMarker'
import {withRouter} from 'react-router-dom'
import {starBasic, starSelected} from '../wrappers/imageWrapper'

type Props = {
  id: string,
  restaurant: BasicRestaurantType,
  restaurants: Array<BasicRestaurantType>,
  history: {push: (path: string) => {}}
}

export class MultipleMarkerMapComponent extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    this.loadMap(nextProps.restaurants, nextProps.restaurant)
  }

  loadMap(restaurants: Array<BasicRestaurantType>, currentRestaurant: BasicRestaurantType) {
    loadGoogleMaps()
      .then(() => {
        const map = initGoogleMap()
        const bounds = initGoogleMapsBounds()
        const startingPoingMarker = StartingPointMarker(map)
        bounds.extend(startingPoingMarker.position)

        restaurants.forEach(restaurant => {
          if (restaurant.geolocation) {
            const position = {lat: restaurant.geolocation.lat, lng: restaurant.geolocation.long}
            const label = {text: restaurant.name}
            const id = restaurant.id

            let restaurantMarker
            if (currentRestaurant && currentRestaurant.id === restaurant.id) {
              restaurantMarker = initGoogleMapsMarker({map, position, label, id, icon: starSelected()})
            } else {
              restaurantMarker = initGoogleMapsMarker({map, position, label, id, icon: starBasic()})
              restaurantMarker.addListener('click', () => this.props.history.push(`/restaurants/${id}`))
            }

            bounds.extend(restaurantMarker.position)
          }
        })

        map.fitBounds(bounds)
      })
  }

  render() {
    return <div id="map"/>
  }
}

const MultipleMarkerMap = withRouter(MultipleMarkerMapComponent)

export default MultipleMarkerMap