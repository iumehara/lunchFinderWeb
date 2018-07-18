// @flow
import React from 'react'
import {getGoogle, initGoogleMap, initGoogleMapsBounds, initGoogleMapsMarker} from '../wrappers/googleMapsWrapper'
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

type State = {
  markers: Array<Object>,
  google?: Object,
  map: Object
}

export class MultipleMarkerMapComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      markers: [],
      map: {}
    }
  }

  componentWillMount() {
    loadGoogleMaps()
      .then(() => {
        const map = initGoogleMap()
        const setStateCallback = () => {
          this.updateMapWithRestaurants(this.props.restaurants, this.props.restaurant)
        }
        this.setState({google: getGoogle(), map}, setStateCallback)
      })
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.state.google === undefined) { return }

    if (
      nextProps.restaurant && nextProps.restaurant.id !== this.props.restaurant.id ||
      nextProps.id && nextProps.id !== this.props.id
    ) {
      this.updateMapWithRestaurants(nextProps.restaurants, nextProps.restaurant)
    }
  }

  updateMapWithRestaurants(restaurants: Array<BasicRestaurantType>, currentRestaurant: BasicRestaurantType) {
    this.state.markers.forEach(marker => marker.setMap(null))

    const markers = []
    restaurants.forEach(restaurant => {
      if (restaurant.geolocation) {
        const position = {lat: restaurant.geolocation.lat, lng: restaurant.geolocation.long}
        const label = {text: restaurant.name}
        const id = restaurant.id

        let restaurantMarker = initGoogleMapsMarker({map: this.state.map, position, label, id, icon: null})
        if (currentRestaurant && currentRestaurant.id === id) {
          restaurantMarker.setIcon(starSelected())
        } else {
          restaurantMarker.setIcon(starBasic())
          restaurantMarker.addListener('click', () => this.props.history.push(`/restaurants/${id}`))
        }

        markers.push(restaurantMarker)
      }
    })

    const bounds = initGoogleMapsBounds()
    markers.forEach(marker => bounds.extend(marker.position))

    const startingPoingMarker = StartingPointMarker(this.state.map)
    bounds.extend(startingPoingMarker.position)
    this.state.map.fitBounds(bounds)

    this.setState({markers})
  }

  render() {
    return <div id="map"/>
  }
}

const MultipleMarkerMap = withRouter(MultipleMarkerMapComponent)

export default MultipleMarkerMap