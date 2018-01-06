import React from 'react'
import { shallow } from 'enzyme'
import Restaurant from '../../src/js/restaurants/Restaurant'

describe('Restaurant', () => {
  it('displays title', () => {
    const props = {
      fetchRestaurant: ()=>{},
      restaurant: {name: 'Pintokona', nameJp: 'ぴんとこな', categories: [{id: 1, name: 'Sushi'}]}
    }
    const restaurant = shallow(<Restaurant {...props}/>)

    expect(restaurant.find('.title').text()).toContain('ぴんとこな(Pintokona)')
    expect(restaurant.find('ul').find('Link').at(0).props().to).toEqual('/categories/1')
    expect(restaurant.find('ul').find('Link').at(0).props().children).toEqual('Sushi')
  })
})
