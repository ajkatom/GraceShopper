import React, { Component } from 'react';
import { deleteLineItem, editLineItem } from './redux/lineitems';
import { connect } from 'react-redux';

class LineItem extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onChange(ev, id) {
    const { lineItem } = this.props;
    lineItem.quantity = ev.target.value * 1;
    this.props.editLineItem(lineItem, id);
  }

  onDelete(ev, id) {
    ev.preventDefault();
    this.props.deleteLineItem(id);
  }

  render() {
    const { lineItem, product, cart, quantity } = this.props;
    const { onChange, onDelete } = this;
    if (!lineItem || !product) {
      return null;
    }
    return (
      <div className='line-item order-line'>
        <div>
          {product.name}
          <div className='product-description-text'>{product.description}</div>
        </div>
        <div>$ {product.price}</div>
        {!cart ? (
          <div>{lineItem.quantity}</div>
        ) : (
            <form>
              <input
                className='order-qty'
                onChange={ev => onChange(ev, lineItem.id)}
                name='quantity'
                value={quantity}
                type='number'
                step='1'
                min='1'
              />
            </form>
          )}
        <div>$ {lineItem.quantity * product.price}</div>
        {cart && (
          <button
            className='btn btn-link'
            type='submit'
            onClick={ev => onDelete(ev, lineItem)}
          >
            &#10060;
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteLineItem: id => dispatch(deleteLineItem(id)),
    editLineItem: (lineItem, id) => dispatch(editLineItem(lineItem, id))
  };
};

const mapStateToProps = ({ products }, { lineItem }) => {
  const product =
    products &&
    lineItem &&
    products.find(product => lineItem.productId === product.id);
  return {
    product
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LineItem);
