import React from 'react'
import NewRestaurantContainer from '../../src/js/restaurants/NewRestaurantContainer'
import * as httpGet from '../../src/js/httpGet'
import { mountContainer, mountedContainerHistory } from '../helper'

describe('NewRestaurantContainer', () => {
  it('displays newRestaurant list from request', () => {
    const httpPostSpy = jest.spyOn(httpGet, 'httpPost')
      .mockImplementation(() => {
        return {then: callbackFunc => callbackFunc(25)}
      })

    const newRestaurantContainer = mountContainer(NewRestaurantContainer)

    const event = {target: {value: 'Pintokona'}}
    newRestaurantContainer.find('input').simulate('change', event)
    newRestaurantContainer.find('button').simulate('click')

    expect(httpPostSpy).toHaveBeenCalledWith("http://localhost:8080/restaurants/", {name: 'Pintokona'})
    expect(mountedContainerHistory(newRestaurantContainer)).toContain('/restaurants/25')
  })
})
