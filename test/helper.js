import React from 'react'
import { mount } from 'enzyme'
import { createStore } from 'redux'
import reducer from '../src/js/reducer'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

export const mountContainer = Container => {
  const store = createStore(reducer)
  return mount(
    <Provider store={store}>
      <HashRouter>
        <Container/>
      </HashRouter>
    </Provider>
  )
}
