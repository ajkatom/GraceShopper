import axios from 'axios';
import { RESET_STATE } from './user';
import { fetchCart } from './cart';

/* ------------     CONSTANTS      ------------------ */
const ADD_ORDER = 'ADD_ORDER';
const GET_ORDERS = 'GET_ORDERS';
const EDIT_ORDER = 'EDIT_ORDER';

/* ------------          REDUCER         ------------------ */
export default function reducer(orders = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case EDIT_ORDER:
      return orders.map(
        order => (order.id === action.id ? action.order : order)
      );
    case ADD_ORDER:
      return [...orders, action.order];
    case RESET_STATE:
      return [];
  }
  return orders;
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchOrders = user => {
  const { id, admin } = user;
  const userId = id;
  return dispatch => {
    let pathName;
    admin
      ? (pathName = `/api/orders`)
      : (pathName = `/api/users/${userId}/orders`);
    return axios
      .get(pathName)
      .then(res => res.data)
      .then(orders => {
        dispatch({ type: GET_ORDERS, orders });
      });
  };
};

export const editOrder = (order, history) => {
  const { id } = order;
  return dispatch => {
    axios
      .put(`/api/orders/${id}`, order)
      .then(res => res.data)
      .then(order => {
        dispatch({ type: EDIT_ORDER, order });
        dispatch(fetchCart(order.userId));
        if (history) {
          dispatch({ type: ADD_ORDER, order });
          dispatch(fetchCart(order.userId));
          history.push(`/user`);
        }
      })
      .catch(err => console.log(err));
  };
};
