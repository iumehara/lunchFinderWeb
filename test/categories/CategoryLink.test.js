import React from 'react'
import { shallow } from 'enzyme'
import CategoryLink from '../../src/js/categories/CategoryLink'

describe('CategoryLink', () => {
  it('displays title', () => {
    const props = {category: {id: 25, name: 'Sushi'}}
    const categoryLink = shallow(<CategoryLink {...props}/>)

    expect(categoryLink.find('Link').props().to).toEqual('/categories/25')
    expect(categoryLink.find('Link').props().children).toEqual('Sushi')
  })
})
