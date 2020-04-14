import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from './redux/products';
import { fetchCategories } from './redux/categories';
import { authenticateUser } from './redux/user';
import { fetchCart } from './redux/cart';
import { Container } from 'reactstrap';

import Navigation from './Navigation';
import Products from './Products';
import Product from './Product';
import User from './User';
import Order from './Order';
import Home from './Home';
import Cart from './Cart';
import Dashboard from './Dashboard';
import Checkout from './Checkout';
import Footer from './Footer';

class Main extends Component {
  componentDidMount() {
    window.localStorage.getItem('token') ?
      this.props.authenticateUser() :
      this.props.fetchCart();
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            render={({ history, location }) => (
              <Navigation history={history} path={location.pathname} />
            )}
          />
          <Container>
            <Switch>
              <Route path='/' exact render={() => <Home />} />
              <Route
                path='/dashboard'
                exact
                render={({ history }) => <Dashboard history={history} />}
              />
              <Route
                path='/products'
                exact
                render={({ history }) => <Products history={history} />}
              />
              <Route
                path='/products/:id'
                exact
                render={({ match, history }) => (
                  <Product id={match.params.id * 1} history={history} />
                )}
              />
              <Route
                path='/cart'
                exact
                render={({ history }) => <Cart history={history} />}
              />
              <Route
                path='/checkout'
                exact
                render={({ history }) => <Checkout history={history} />}
              />
              <Route
                path='/orders/:id'
                exact
                render={({ match }) => <Order id={match.params.id * 1} />}
              />
              <Route path='/user' exact render={() => <User />} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCategories: () => dispatch(fetchCategories()),
    authenticateUser: () => dispatch(authenticateUser),
    fetchCart: () => dispatch(fetchCart())
  };
};

export default connect(null, mapDispatchToProps)(Main);
