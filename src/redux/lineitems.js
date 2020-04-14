import axios from 'axios';
import { RESET_STATE } from './user';

/* ------------     CONSTANTS      ------------------ */
export const GET_CART_LINE_ITEMS = 'GET_CART_LINE_ITEMS';
export const CREATE_LINE_ITEM = 'CREATE_LINE_ITEM';
export const UPDATE_LINE_ITEM = 'UPDATE_LINE_ITEM';
export const DELETE_LINE_ITEM = 'DELETE_LINE_ITEM';

/* ------------          REDUCER         ------------------ */
export default function reducer(lineItems = [], action) {
  switch (action.type) {
    case GET_CART_LINE_ITEMS:
      return action.cartLineItems;
    case CREATE_LINE_ITEM:
      return [...lineItems, action.lineItem];
    case UPDATE_LINE_ITEM:
      return lineItems.map(lineItem => {
        return lineItem.productId === action.lineItem.productId
          ? action.lineItem
          : lineItem;
      });
    case DELETE_LINE_ITEM:
      return lineItems.filter(
        lineItem => lineItem.productId !== action.lineItem.productId
      );
    case RESET_STATE:
      return [];
  }
  return lineItems;
}

/* ------------       THUNK CREATORS     ------------------ */
export const addLineItem = (lineItem, user, history) => {
  return dispatch => {
    if (!user.id) {
      const lineItems =
        JSON.parse(window.localStorage.getItem('lineItems')) || [];
      const cartLineItems = [...lineItems, lineItem];
      window.localStorage.setItem('lineItems', JSON.stringify(cartLineItems));
      dispatch({ type: GET_CART_LINE_ITEMS, cartLineItems });
      history && history.push(`/cart`);
    } else {
      axios
        .post(`/api/lineItems`, lineItem)
        .then(res => res.data)
        .then(lineItem => {
          if (history) {
            dispatch({ type: CREATE_LINE_ITEM, lineItem });
            history.push(`/cart`);
          }
        })
        .catch(err => console.log(err));
    }
  };
};

export const editLineItem = (lineItem, lineItemId, history) => {
  return dispatch => {
    if (!lineItemId) {
      const lineItems = JSON.parse(window.localStorage.getItem('lineItems'));
      const cartLineItems =
        lineItems &&
        lineItems.map(cartLineItem => {
          if (lineItem.productId === cartLineItem.productId) {
            cartLineItem = lineItem;
          }
          return cartLineItem;
        });
      window.localStorage.setItem('lineItems', JSON.stringify(cartLineItems));
      dispatch({ type: GET_CART_LINE_ITEMS, cartLineItems });
      history && history.push(`/cart`);
    } else {
      axios
        .put(`/api/lineItems/${lineItemId}`, lineItem)
        .then(res => res.data)
        .then(lineItem => dispatch({ type: UPDATE_LINE_ITEM, lineItem }))
        .then(() => history && history.push(`/cart`))
        .catch(err => console.log(err));
    }
  };
};

export const deleteLineItem = lineItem => {
  return dispatch => {
    if (!lineItem.id) {
      const lineItems = JSON.parse(window.localStorage.getItem('lineItems'));
      const cartLineItems =
        lineItems &&
        lineItems.filter(
          _lineItem => _lineItem.productId !== lineItem.productId
        );
      window.localStorage.setItem('lineItems', JSON.stringify(cartLineItems));
      dispatch({ type: GET_CART_LINE_ITEMS, cartLineItems });
    } else {
      axios
        .delete(`/api/lineItems/${lineItem.id}`)
        .then(res => res.data)
        .then(() => dispatch({ type: DELETE_LINE_ITEM, lineItem }))
        .catch(err => console.log(err));
    }
  };
};
