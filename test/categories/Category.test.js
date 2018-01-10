import React from 'react'
import {shallow} from 'enzyme'
import Category from '../../src/js/categories/Category'

describe('Category', () => {
  it('displays title', () => {
    const props = {
      fetchCategory: ()=>{},
      fetchRestaurants: () => {},
      category: {name: 'Sushi', restaurants: [{id: 1, name: 'Pintokona'}]},
      restaurants: [],
      restaurant: {}
    }
    const category = shallow(<Category {...props}/>)

    expect(category.find('.title').text()).toContain('Sushi')
    expect(category.find('RestaurantCard').length).toBe(1)
    expect(category.find('RestaurantCard').props().restaurant).toEqual({id: 1, name: 'Pintokona'})
  })
})
