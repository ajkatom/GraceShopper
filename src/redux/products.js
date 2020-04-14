import axios from 'axios';

/* -----------------    CONSTANTS    ------------------ */
const GET_PRODUCTS = 'GET_PRODUCTS';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const CREATE_PRODUCT = 'CREATE_PRODUCT';

/* ------------          REDUCER         ------------------ */
export default function reducer(products = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case EDIT_PRODUCT:
      return products.map(
        product => (product.id === action.product.id ? action.product : product)
      );
    case CREATE_PRODUCT:
      return [...products, action.product];
  }
  return products;
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchProducts = () => {
  return dispatch => {
    axios
      .get('/api/products')
      .then(res => res.data)
      .then(products => dispatch({ type: GET_PRODUCTS, products }));
  };
};

export const createOrUpdateProduct = product => {
  return dispatch => {
    const { id } = product;
    const putOrPost = !id ? 'post' : 'put';
    return axios[putOrPost](`/api/products/${id ? id : ''}`, { product })
      .then(res => res.data)
      .then(product => {
        if (!id) {
          return dispatch({ type: CREATE_PRODUCT, product });
        } else {
          return dispatch({ type: EDIT_PRODUCT, product });
        }
      });
  };
};
