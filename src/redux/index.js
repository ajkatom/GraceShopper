import { combineReducers } from 'redux';
import cart from './cart';
import orders from './orders';
import lineItems from './lineitems';
import products from './products';
import categories from './categories';
import users from './users';
import user from './user';

export default combineReducers({
  user,
  users,
  orders,
  categories,
  products,
  lineItems,
  cart
});
