import React from 'react'
import { shallow } from 'enzyme'
import App from '../src/js/App'

describe('App', () => {
  it('displays Hello World', () => {
    const app = shallow(<App/>)

    expect(app.text()).toEqual('Hello World!')
  })
})
