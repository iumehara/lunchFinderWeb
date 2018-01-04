import { httpGet } from './httpGet'

export const fetchThenDispatch = (url, type, dispatch) => {
  httpGet(url)
    .then(data => dispatch({type: type + '_SUCCESS', data}))
}

export const setDispatch = (data, type, dispatch) => {
  dispatch({type: `${type}_SUCCESS`, data})
}
