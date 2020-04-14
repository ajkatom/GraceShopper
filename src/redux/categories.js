import axios from 'axios';

/* ------------    CONSTANTS      ------------------ */
const GET_CATEGORIES = 'GET_CATEGORIES';

/* ------------          REDUCER         ------------------ */
export default function reducer(categories = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
  }
  return categories;
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchCategories = () => {
  return dispatch => {
    axios
      .get('/api/categories')
      .then(res => res.data)
      .then(categories => dispatch({ type: GET_CATEGORIES, categories }));
  };
};
