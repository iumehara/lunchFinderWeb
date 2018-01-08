import React from 'react'
import { shallow } from 'enzyme'
import RestaurantCard from '../../src/js/restaurants/RestaurantCard'

describe('RestaurantCard', () => {
  it('displays title', () => {
    const props = {restaurant: {id: 25, name: 'Pintokona', nameJp: 'ぴんとこな', categories: [{id: 1, name: 'Sushi'}]}}
    const restaurantCard = shallow(<RestaurantCard {...props}/>)

    expect(restaurantCard.find('Link').props().to).toEqual('/restaurants/25')
    expect(restaurantCard.find('Link .title').text()).toEqual('Pintokona (ぴんとこな)')
    expect(restaurantCard.find('CategoryLink').length).toEqual(1)
  })
})
