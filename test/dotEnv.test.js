// import * as envSample from '../.envSample'
import {variables} from '../.envSample'

describe('.env', () => {
  it('exports all variables defined in .envSample', () => {
    let variableValue
    variables.forEach(variableKey => {
      variableValue = process.env[variableKey]

      expect(variableValue).not.toBe(undefined)
    })
  })
})
