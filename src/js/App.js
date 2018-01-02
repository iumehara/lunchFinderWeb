import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import App from './App'
import Categories from './Categories'
import Restaurants from './Restaurants'

const AppRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Categories}/>
      <Route path="/categories" component={Categories}/>
      <Route path="/restaurants" component={Restaurants}/>
    </div>
  </Router>
)

export default AppRouter
