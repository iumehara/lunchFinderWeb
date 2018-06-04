import React from 'react'
import { shallow } from 'enzyme'
import Categories from '../../src/js/categories/Categories'

describe('Categories', () => {
  it('displays list', () => {
    const props = {fetchCategories: ()=>{}, categories: [{name: 'Sushi'}, {name: 'Ramen'}], resetForm: () => {}}
    const app = shallow(<Categories {...props}/>)

    expect(app.find('CategoryLink').length).toBe(2)
    expect(app.find('CategoryLink').at(0).props().category).toEqual({name: 'Sushi'})
    expect(app.find('CategoryLink').at(1).props().category).toEqual({name: 'Ramen'})
  })

  it('displays form', () => {
    const props = {fetchCategories: ()=>{}, categories: [{name: 'Sushi'}, {name: 'Ramen'}], resetForm: () => {}}
    const app = shallow(<Categories {...props}/>)

    expect(app.find('.name label').length).toBe(1)
    expect(app.find('.name input').length).toBe(1)
    expect(app.find('button.save').length).toBe(1)
  })
})
