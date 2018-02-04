import {
  createScriptElement,
  appendElementToHead,
  setFlag,
  isFlagset
} from '../wrappers/documentWrapper'

export const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (isFlagset('mapLoaded')) {
      resolve()
    } else {
      const script = createScriptElement()
      const googleApiUrl = 'https://maps.googleapis.com/maps/api/js'
      const googleApiKey = process.env.GOOGLE_API_KEY

      appendElementToHead(script)
      script.onload = () => resolve()
      script.src = `${googleApiUrl}?key=${googleApiKey}`
      script.onerror = () => reject(new Error('Script load error: ' + script.src))

      setFlag('mapLoaded')
    }
  })
}
