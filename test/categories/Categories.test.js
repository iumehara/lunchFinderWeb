import React from 'react'
import { shallow } from 'enzyme'
import Categories from '../../src/js/categories/Categories'

describe('Categories', () => {
  it('displays list', () => {
    const props = {fetchCategories: ()=>{}, categories: [{name: 'Sushi'}, {name: 'Ramen'}]}
    const app = shallow(<Categories {...props}/>)

    expect(app.find('ul Link').length).toBe(2)
    expect(app.find('ul Link').at(0).props().children).toBe('Sushi')
    expect(app.find('ul Link').at(1).props().children).toBe('Ramen')
  })

  it('displays form', () => {
    const props = {fetchCategories: ()=>{}, categories: [{name: 'Sushi'}, {name: 'Ramen'}]}
    const app = shallow(<Categories {...props}/>)

    expect(app.find('.name label').length).toBe(1)
    expect(app.find('.name input').length).toBe(1)
    expect(app.find('button.save').length).toBe(1)
  })
})
