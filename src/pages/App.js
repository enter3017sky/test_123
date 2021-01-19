import React from 'react'
import ProductShop from './product/ProductShop'
import ProductDetail from './product/ProductDetail'
import CampfireIndex from './product/CampfireIndex'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import { Router , Switch, Route } from 'react-router-dom'
import history from '../utils/history'
import './App.css'


const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path={'/'} exact component={CampfireIndex} />
        <Route path={'/shop'} exact component={ProductShop} />
        <Route path={'/shop/search'} exact component={ProductShop} />
        <Route path={'/detail/:id'} exact component={ProductDetail} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App