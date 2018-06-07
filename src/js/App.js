import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import NewCategoryContainer from './categories/NewCategoryContainer'
import CategoryContainer from './categories/CategoryContainer'
import EditCategoryContainer from './categories/EditCategoryContainer'
import NewRestaurantContainer from './restaurants/NewRestaurantContainer'
import RestaurantContainer from './restaurants/RestaurantContainer'
import EditRestaurantContainer from './restaurants/EditRestaurantContainer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'

export default function App() {
  const store = createStore(reducer)

  return (
    <Provider store={store}>
      <Router>
        <div className='app'>
          <ul>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/restaurants/new">Add Restaurant</Link></li>
          </ul>

          <hr/>
          <Switch>
            <Route exact path="/" component={NewCategoryContainer}/>
            <Route exact path="/categories" component={NewCategoryContainer}/>
            <Route exact path="/categories/:id" component={CategoryContainer}/>
            <Route exact path="/categories/:id/edit" component={EditCategoryContainer}/>
            <Route exact path="/restaurants/new" component={NewRestaurantContainer}/>
            <Route exact path="/restaurants/:id" component={RestaurantContainer}/>
            <Route exact path="/restaurants/:id/edit" component={EditRestaurantContainer}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}
