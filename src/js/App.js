import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducer'
import TopHeader from './header/TopHeader'
import SubHeaderContainer from './header/SubHeaderContainer'
import NewCategoryContainer from './categories/NewCategoryContainer'
import EditCategoryContainer from './categories/EditCategoryContainer'
import NewRestaurantContainer from './restaurants/NewRestaurantContainer'
import EditRestaurantContainer from './restaurants/EditRestaurantContainer'
import CategoryContainer from './categories/CategoryContainer'
import RestaurantContainer from './restaurants/RestaurantContainer'

export default function App() {
  const store = createStore(reducer)

  return (
    <Provider store={store}>
      <Router>
        <div className='app'>
          <TopHeader/>
          <SubHeaderContainer/>

          <Switch>
            <Route exact path="/" component={NewCategoryContainer}/>
            <Route exact path="/categories/new" component={NewCategoryContainer}/>
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
