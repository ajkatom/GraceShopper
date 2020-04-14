import React from 'react';

const OrderRow = ({ order }) => {
  return (
    <div className='order-row'>
      <div>{order.id}</div>
      <div>{order.shipped ? 'Shipped' : 'Processing'}</div>
      <div>{order.lineItems.reduce((total, line) => {
        return total + line.quantity;
      }, 0)}</div>
    </div>
  );
};

export default OrderRow;

