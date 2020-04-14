import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { editOrder } from './redux/orders.js';
import axios from 'axios';
import AddressDropdown from './AddressDropdown';
import AddressForm from './AddressForm';
import Autocomplete from './Autocomplete';
import Order from './Order';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      editing: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onSubmit(token) {
    const { cart, user, total, address, history } = this.props;
    const charge = {
      amount: total * 100,
      currency: 'usd',
      description: `order ID: ${cart.id}`,
      source: token.id,
      receipt_email: user.email
    };

    const email = {
      from: '"Don Dapper" <donald@don-dapper.com>',
      to: user.email,
      subject: 'Order Confirmed',
      html: `<div>
        Hi, ${user.firstName}.
        <br />
        <br />
        Here are your order details.
        <br />
        <br />
        Order ID: ${cart.id}
        <br />
        Total: $${total}
        <br />
        Address:
        <br />
        ${address && address.fullAddress}
        <br />
        <br />
        Thank you for your purchase.
      </div>`
    };
    axios
      .post(`/api/stripe/pay`, charge)
      .then(res => res.data)
      .then(() => {
        this.props.editOrder({ id: cart.id, status: 'order' }, history);
        axios.post(`/api/email/send`, email).then(res => res.data);
      })
      .catch(err => console.log(err));
  }

  onEdit() {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  render() {
    const { onSubmit, onEdit } = this;
    const { user, cart, address, lineItems, total } = this.props;
    const { editing } = this.state;
    const stripeKey = 'pk_test_t4Gsi41KZkmzWDyxcwcFMHhp';
    if (!user.id) {
      return (
        <div>
          <h1>Review Order</h1>
          <div>Please log in or sign up to check out.</div>
        </div>
      );
    } else {
      return (
        <div className='checkout'>
          <div>
            <h1>Review Order</h1>
            <Order order={cart} lineItems={lineItems} />
          </div>
          <div className='checkout-right'>
            <h3>Shipping To:</h3>
            {!cart.addressId ? (
              <Autocomplete cart={cart} />
            ) : editing ? (
              <AddressForm cart={cart} onEdit={onEdit} />
            ) : (
                  <div>
                    <div>
                      <div>{address && address.fullAddress}</div>
                      <button className='btn btn-warning' onClick={onEdit}>
                        Edit Address
                  </button>
                    </div>
                  </div>
                )}
            <AddressDropdown onEdit={onEdit} />
            <StripeCheckout
              name='Payment'
              description='Please review your order'
              image='/images/favicon.png'
              panelLabel='Place Order - '
              amount={total * 100}
              currency='USD'
              allowRememberMe={false}
              email={user.email}
              token={onSubmit}
              stripeKey={stripeKey}
            >
              <button
                disabled={!cart.addressId}
                type='submit'
                className='btn btn-success'
              >
                Check Out
              </button>
            </StripeCheckout>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ cart, user, lineItems, products }) => {
  const address =
    user.addresses &&
    user.addresses.find(address => address.id === cart.addressId);
  const total =
    user.id &&
    lineItems &&
    lineItems.reduce((quantity, lineItem) => {
      const product = products.find(
        product => product.id === lineItem.productId
      );
      if (product) {
        quantity += product.price * lineItem.quantity;
      }
      return quantity;
    }, 0);
  return { cart, user, address, lineItems, total };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: (order, history) => dispatch(editOrder(order, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
