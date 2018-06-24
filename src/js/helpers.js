export const displayUrl = urlString => {
  if (urlString === undefined || urlString == null) {
    return null
  }

  if (urlString.substring(0, 4) !== 'http') {
    return 'http://' + urlString
  }

  return urlString
}