import React from 'react';
import {
  Navbar,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import AccountDropdown from './AccountDropdown';
import ProductsDropdown from './ProductsDropdown';

const Navigation = ({ user, counter, history, path }) => {
  return (
    <Navbar color='light' light>
      <div className='nav'>
        <Link className='navbar-brand' to='/'><img style={{ width: '25%' }} className='navbar-logo' src='/images/logo.png' /></Link>
        <div>
          {user.admin && (
            <NavItem>
              <NavLink href='/#/dashboard'>Admin Dashboard</NavLink>
            </NavItem>)
          }
        </div>
        <NavItem>
          <ProductsDropdown />
        </NavItem>
        <NavItem>
          <NavLink href='/#/cart'>Cart ({counter})</NavLink>
        </NavItem>
        <NavItem>
          <AccountDropdown path={path} history={history} />
        </NavItem>
      </div>
    </Navbar>
  );
};

const mapStateToProps = ({ user, lineItems }) => {
  const counter = lineItems.length;
  return {
    user,
    counter
  };
};

export default connect(mapStateToProps)(Navigation);
