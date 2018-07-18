import {getElementById} from './documentWrapper'

export const initGoogleMap = center => {
  return new google.maps.Map(getElementById('map'))
}

export const initCenteredGoogleMap = center => {
  return new google.maps.Map(getElementById('map'), {zoom: 18, center})
}

export const initGoogleMapsMarker = options => {
  return new google.maps.Marker(options)
}

export const initGoogleMapsBounds = () => {
  return new google.maps.LatLngBounds()
}

export const addGoogleClickListener = (map, callback) => {
  return google.maps.event.addListener(map, 'click', callback)
}

export const getGoogle = () => { return google }
