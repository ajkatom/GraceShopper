import React from 'react';
import { connect } from 'react-redux';
import LineItem from './LineItem';

const Order = ({ order, lineItems, total }) => {
  return (
    <div>
      {order.status === 'order' && <h3>{`Order ID: ${order && order.id}`}</h3>}
      <div className='order'>
        <div>Item</div>
        <div>Price</div>
        <div>Qty</div>
        <div>Total</div>
        {lineItems &&
          lineItems.map((lineItem, index) => (
            <LineItem key={lineItem.id || index} lineItem={lineItem} />
          ))}
        <div className='order-total'>Order Total</div>
        <div>$ {total}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (
  { user, orders, products },
  { id, order, lineItems }
) => {
  order = order || (orders && id && orders.find(order => order.id === id));
  lineItems = lineItems || (order && order.lineItems);
  const total =
    lineItems &&
    lineItems.reduce((amounts, lineItem) => {
      const product = products.find(_product => _product.id === lineItem.productId);
      amounts += product.price * lineItem.quantity;
      return amounts;
    }, 0);
  return { user, order, products, lineItems, total };
};

export default connect(mapStateToProps)(Order);
