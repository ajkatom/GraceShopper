import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LineItem from './LineItem';

const Cart = ({ lineItems, total }) => {
  return (
    <div>
      <h1>Cart</h1>
      {!lineItems.length ? <div>Your have no items in your cart.</div> : (
        <div className='order order-container'>
          <div>Item</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
          <div>Remove</div>
          {lineItems.map((lineItem, index) => (
            <LineItem key={lineItem.id || index} lineItem={lineItem} quantity={lineItem.quantity} cart={true} />
          ))}
          <Link to='/checkout' className='btn btn-success'>
            Proceed to Checkout
          </Link>
          <div className='order-total'>Total:</div>
          <div>$ {total}</div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ cart, lineItems, products }) => {
  const total =
    lineItems &&
    lineItems.reduce((quantity, lineItem) => {
      const product =
        products.length &&
        products.find(product => product.id === lineItem.productId);
      if (product) {
        quantity += product.price * lineItem.quantity;
      }
      return quantity;
    }, 0);
  return { cart, lineItems, total };
};

export default connect(mapStateToProps)(Cart);
