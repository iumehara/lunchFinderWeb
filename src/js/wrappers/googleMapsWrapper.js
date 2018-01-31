import {getElementById} from './documentWrapper'

export const initGoogleMapsMarker = (position, map) => {
  return new google.maps.Marker({position, map})
}

export const initCenteredGoogleMap = center => {
  return new google.maps.Map(getElementById('map'), {zoom: 18, center})
}
