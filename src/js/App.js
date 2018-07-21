import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducer'
import TopHeaderContainer from './header/TopHeaderContainer'
import SubHeaderContainer from './header/SubHeaderContainer'

import NewCategoryContainer from './categories/NewCategoryContainer'
import CategoryContainer from './categories/CategoryContainer'
import EditCategoryContainer from './categories/EditCategoryContainer'

import RestaurantsContainer from './restaurants/RestaurantsContainer'
import NewRestaurantContainer from './restaurants/NewRestaurantContainer'
import RestaurantContainer from './restaurants/RestaurantContainer'
import EditRestaurantContainer from './restaurants/EditRestaurantContainer'

export default function App() {
  const store = createStore(reducer)

  return (
    <Provider store={store}>
      <Router>
        <div className='app'>
          <TopHeaderContainer/>
          <SubHeaderContainer/>

          <Switch>
            <Route exact path="/" component={RestaurantsContainer}/>
            <Route exact path="/categories/new" component={NewCategoryContainer}/>
            <Route exact path="/categories/:id" component={CategoryContainer}/>
            <Route exact path="/categories/:id/edit" component={EditCategoryContainer}/>
            <Route exact path="/restaurants" component={RestaurantsContainer}/>
            <Route exact path="/restaurants/new" component={NewRestaurantContainer}/>
            <Route exact path="/restaurants/:id" component={RestaurantContainer}/>
            <Route exact path="/restaurants/:id/edit" component={EditRestaurantContainer}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}
