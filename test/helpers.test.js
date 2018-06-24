import {displayUrl} from '../src/js/helpers'

describe('helpers', () => {
  describe('displayUrl', () => {
    it('handles http prefix', () => {
      const stringWithHttpPrefix = 'http://example.com'


      const url = displayUrl(stringWithHttpPrefix)


      expect(url).toEqual('http://example.com')
    })

    it('handles https prefix', () => {
      const stringWithHttpsPrefix = 'https://example.com'


      const url = displayUrl(stringWithHttpsPrefix)


      expect(url).toEqual('https://example.com')
    })

    it('handles no prefix', () => {
      const stringWithNoPrefix = 'example.com'


      const url = displayUrl(stringWithNoPrefix)


      expect(url).toEqual('http://example.com')
    })

    it('handles undefined', () => {
      let undefinedString


      const url = displayUrl(undefinedString)


      expect(url).toEqual(null)
    })

    it('handles null', () => {
      let nullString = null


      const url = displayUrl(nullString)


      expect(url).toEqual(null)
    })
  })
})