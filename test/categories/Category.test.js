import React from 'react'
import { shallow } from 'enzyme'
import Category from '../../src/js/categories/Category'

describe('Category', () => {
  it('displays title', () => {
    const props = {
      fetchCategory: ()=>{},
      category: {name: 'Sushi', restaurants: [{name: 'Pintokona'}]}
    }
    const app = shallow(<Category {...props}/>)

    expect(app.text()).toContain('Sushi')
    expect(app.text()).toContain('Pintokona')
  })
})
