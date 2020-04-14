import axios from 'axios';

/* ------------     CONSTANTS      ------------------ */
const GET_USERS = 'GET_USERS';

/* ------------          REDUCER         ------------------ */
export default function reducer(users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
  }
  return users;
}

/* ------------       THUNK CREATORS     ------------------ */
export const showUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users/all')
      .then(res => res.data)
      .then(users => {
        dispatch({ type: GET_USERS, users });
      });
  };
};
