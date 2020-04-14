import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducer from './redux';
import { authenticateUser } from './redux/user';
import { editOrder } from './redux/orders';

// ADDRESS
const createOrUpdateAddress = (address, cart) => {
  return dispatch => {
    const { id } = address;
    const putOrPost = !id ? 'post' : 'put';
    return axios[putOrPost](`api/addresses/${id ? id : ''}`, { address })
      .then(res => res.data)
      .then(address => {
        dispatch(editOrder({ id: cart.id, addressId: address.id }));
        dispatch(authenticateUser);
      });
  };
};

const deleteAddress = address => {
  return dispatch => {
    return axios
      .delete(`/api/addresses/${address.id}`)
      .then(res => res.data)
      .then(() => {
        dispatch(authenticateUser);
      });
  };
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

export { deleteAddress, createOrUpdateAddress };
