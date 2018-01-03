import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import CategoriesContainer from './categories/CategoriesContainer'
import CategoryContainer from './categories/CategoryContainer'
import Restaurants from './restaurants/Restaurants'
import RestaurantContainer from './restaurants/RestaurantContainer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'

export default function App() {
  const store = createStore(reducer)

  return (
    <Provider store={store}>
      <Router>
        <div>
          <ul>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/restaurants">Restaurants</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={CategoriesContainer}/>
          <Route exact path="/categories" component={CategoriesContainer}/>
          <Route exact path="/categories/:id" component={CategoryContainer}/>
          <Route exact path="/restaurants" component={Restaurants}/>
          <Route exact path="/restaurants/:id" component={RestaurantContainer}/>
        </div>
      </Router>
    </Provider>
  )
}
