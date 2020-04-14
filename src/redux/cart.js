import axios from 'axios';
import { RESET_STATE } from './user';
import {
  GET_CART_LINE_ITEMS,
  UPDATE_LINE_ITEM,
  CREATE_LINE_ITEM
} from './lineitems';

/* ------------     CONSTANTS      ------------------ */
const GET_CART = 'GET_CART';

/* ------------          REDUCER         ------------------ */
export default function reducer(cart = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case RESET_STATE:
      return {};
  }
  return cart;
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchCart = userId => {
  return dispatch => {
    if (!userId) {
      const lineItems =
        JSON.parse(window.localStorage.getItem('lineItems')) || [];
      dispatch({ type: GET_CART_LINE_ITEMS, cartLineItems: lineItems });
    } else {
      axios
        .get(`/api/users/${userId}/cart`)
        .then(res => res.data)
        .then(cart => {
          dispatch({ type: GET_CART, cart });
          dispatch({
            type: GET_CART_LINE_ITEMS,
            cartLineItems: cart.lineItems || []
          });
          const cartLineItems = JSON.parse(
            window.localStorage.getItem('lineItems')
          );
          cartLineItems &&
            cartLineItems.forEach(lineItem => {
              const cartLineItem =
                cart.lineItems &&
                cart.lineItems.find(
                  cartLineItem => cartLineItem.productId === lineItem.productId
                );
              if (cartLineItem) {
                const quantity = cartLineItem.quantity + lineItem.quantity;
                axios
                  .put(`/api/lineItems/${cartLineItem.id}`, { quantity })
                  .then(res => res.data)
                  .then(lineItem =>
                    dispatch({ type: UPDATE_LINE_ITEM, lineItem }))
                  .catch(err => console.log(err));
              } else {
                lineItem.orderId = cart.id;
                axios
                  .post(`/api/lineItems`, lineItem)
                  .then(res => res.data)
                  .then(lineItem =>
                    dispatch({ type: CREATE_LINE_ITEM, lineItem }))
                  .catch(err => console.log(err));
              }
            });
        })
        .then(() => window.localStorage.removeItem('lineItems'))
        .catch(err => console.log(err));
    }
  };
};
