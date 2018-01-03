import React from 'react'
import { shallow } from 'enzyme'
import Categories from '../../src/js/categories/Categories'

describe('Categories', () => {
  it('displays title', () => {
    const props = {fetchCategories: ()=>{}, categories: []}
    const app = shallow(<Categories {...props}/>)

    expect(app.text()).toEqual('Categories')
  })
})
