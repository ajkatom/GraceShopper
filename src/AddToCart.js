import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLineItem, editLineItem } from './redux/lineitems';

class AddToCart extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { cart, product, lineItem, user, history } = this.props;
    if (!lineItem) {
      this.props.addLineItem(
        {
          quantity: this.state.quantity * 1,
          orderId: cart.id,
          productId: product.id
        },
        user,
        history
      );
    } else {
      const quantity = this.state.quantity * 1 + lineItem.quantity * 1;
      lineItem.quantity = quantity;
      this.props.editLineItem(lineItem, lineItem.id);
    }
    this.setState({
      quantity: 1
    });
  }

  render() {
    const { onChange, onSubmit } = this;
    const { quantity } = this.state;
    return (
      <div style={{ width: '50%' }}>
        <form className='input-group'>
          <input
            className='form-control'
            onChange={onChange}
            name='quantity'
            value={quantity}
            type='number'
            step='1'
            min='1'
          />
          <div className='input-group-append'>
            <button
              type='submit'
              className='btn btn-outline-success'
              onClick={onSubmit}
            >
              Add to Cart
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, user, lineItems }, { product }) => {
  const lineItem =
    lineItems && lineItems.find(lineItem => lineItem.productId === product.id);
  user = user || {};
  return {
    cart,
    product,
    user,
    lineItem
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addLineItem: (lineItem, user) =>
      dispatch(addLineItem(lineItem, user, history)),
    editLineItem: (lineItem, id) =>
      dispatch(editLineItem(lineItem, id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
