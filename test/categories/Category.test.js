import React from 'react'
import { shallow } from 'enzyme'
import Category from '../../src/js/categories/Category'

describe('Category', () => {
  it('displays title', () => {
    const props = {
      fetchCategory: ()=>{},
      category: {name: 'Sushi', restaurants: [{id: 1, name: 'Pintokona'}]}
    }
    const category = shallow(<Category {...props}/>)

    expect(category.find('.title').text()).toContain('Sushi')
    expect(category.find('ul').find('Link').at(0).props().to).toEqual('/restaurants/1')
    expect(category.find('ul').find('Link').at(0).props().children).toEqual('Pintokona')
  })
})
