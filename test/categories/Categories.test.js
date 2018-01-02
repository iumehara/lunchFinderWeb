import React from 'react'
import { shallow } from 'enzyme'
import Categories from '../../src/js/categories/Categories'

describe('Categories', () => {
  it('displays title', () => {
    const app = shallow(<Categories/>)

    expect(app.text()).toEqual('Categories')
  })
})
