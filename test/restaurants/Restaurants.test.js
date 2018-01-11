import React from 'react'
import { shallow } from 'enzyme'
import Restaurants from '../../src/js/restaurants/Restaurants'

describe('Restaurants', () => {
  it('displays title', () => {
    const app = shallow(<Restaurants/>)

    expect(app.text()).toEqual('Restaurants')
  })
})
