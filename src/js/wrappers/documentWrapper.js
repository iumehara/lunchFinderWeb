export const getElementById = id => {
  return document.getElementById(id)
}

export const createScriptElement = () => {
  return document.createElement('script')
}

export const appendElementToHead = element => {
  document.head.append(element)
}

export const setFlag = flag => {
  document[flag] = true
}

export const isFlagset = flag => {
  return document[flag] == true
}
