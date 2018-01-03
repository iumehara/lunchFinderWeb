import { fetchWrapper } from './wrappers/fetchWrapper'

export const httpGet = (url) => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  return fetchWrapper(url, {headers})
    .then(rawData => rawData.json())
}
