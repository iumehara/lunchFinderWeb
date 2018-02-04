import { initGoogleMapsMarker } from '../wrappers/googleMapsWrapper'

export const StartingPointMarker = map => {
  return initGoogleMapsMarker({
    position: {lat: 35.660480, lng: 139.729247},
    map: map,
    label: {text: 'Roppongi Hills'}
  })
}
