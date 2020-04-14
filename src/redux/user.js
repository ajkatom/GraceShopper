import axios from 'axios';
import { fetchCart } from './cart';
import { fetchOrders } from './orders';
import { showUsers } from './users';

let token = window.localStorage.getItem('token');
axios.defaults.headers.common.token = token;

/* ------------     CONSTANTS      ------------------ */
const GET_USER = 'GET_USER';
export const RESET_STATE = 'RESET_STATE';

/* ------------          REDUCER         ------------------ */
export default function reducer(user = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case RESET_STATE:
      return {};
  }
  return user;
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchUser = user => {
  return dispatch => {
    dispatch(login(user));
  };
};

export const login = user => {
  return dispatch => {
    return axios
      .post(`/api/users/login`, { user })
      .then(res => res.data)
      .then(token => {
        axios.defaults.headers.common.token = token;
        window.localStorage.setItem('token', token);
        dispatch(authenticateUser);
      });
  };
};

export const logout = (path, history, dispatch) => {
  window.localStorage.removeItem('token');
  if (path === '/checkout' || path === '/user') {
    history.push(`/`);
  }
  return dispatch({ type: RESET_STATE });
};

export const authenticateUser = dispatch => {
  return axios
    .get('/api/users')
    .then(res => res.data)
    .then(user => {
      dispatch({ type: GET_USER, user });
      dispatch(fetchCart(user.id));
      dispatch(fetchOrders(user));
    })
    .catch(err => {
      window.localStorage.removeItem('token');
      console.log(err);
    });
};

export const createOrUpdateUser = (user, history, admin) => {
  const { id } = user;
  const putOrPost = id ? 'put' : 'post';
  return dispatch => {
    return axios[putOrPost](`/api/users/${id ? id : ''}`, { user })
      .then(res => res.data)
      .then(user => {
        admin ? dispatch(showUsers()) : dispatch(login(user));
        if (history) {
          history.push(`/user`);
        }
      });
  };
};
