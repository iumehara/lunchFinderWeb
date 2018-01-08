import React from 'react'
import { mount } from 'enzyme'
import { createStore } from 'redux'
import reducer from '../src/js/reducer'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

export const mountContainer = (Container, params) => {
  const store = createStore(reducer)
  return mount(
    <Provider store={store}>
      <HashRouter>
        <Container match={{params: params}} history={[]}/>
      </HashRouter>
    </Provider>
  )
}

export const mountedContainerHistory = (mountedContainer) => {
  return mountedContainer.find('Connect').at(0).props().history
}
