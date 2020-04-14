import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import OrderRow from './OrderRow';
import Order from './Order';
import PasswordChange from './PasswordChange';

class User extends Component {
  constructor() {
    super();
    this.state = {
      showOrder: false,
      orderId: null,
      password: false
    };
    this.onClick = this.onClick.bind(this);
    this.hide = this.hide.bind(this);
    this.passwordClick = this.passwordClick.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onClick(orderId) {
    this.setState({ showOrder: true, orderId });
  }

  passwordClick() {
    this.setState({ password: !this.state.password });
  }

  onUpdate() {
    this.setState({ password: false });
  }

  hide() {
    window.scrollTo(0, 0);
    this.setState({ showOrder: false, orderId: null });
  }

  render() {
    const { user, orders } = this.props;
    const { showOrder, orderId, password } = this.state;
    const { onClick, hide, passwordClick, onUpdate } = this;
    return (
      <div>
        {!user.id ?
          <div>
            <h1>Account</h1>
            Please sign in.
          </div> :
          <div className='account'>
            <h2 className='user'>{user.name}</h2>
            <div className='orders'>
              <h3>Orders</h3>
              <div className='header-row'>
                <div>ID</div>
                <div>Status</div>
                <div>Total</div>
              </div>
              {orders.map(order => (
                <span onClick={() => onClick(order.id)} key={order.id}>
                  <OrderRow order={order} />
                </span>
              ))}
            </div>
            <div className='user-form'>
              <h3>Update Info</h3>
              {password ? (
                <div>
                  <PasswordChange onUpdate={onUpdate} />
                  <button className='btn btn-warning' style={{ width: '100%' }} onClick={passwordClick}> Cancel </button>
                </div>
              ) : (
                  <div>
                    <UserForm />
                    <button className='btn btn-primary' style={{ width: '100%' }} onClick={passwordClick}> Change Password </button>
                  </div>
                )}
            </div>
            {showOrder && orderId && (
              <div id='order' className='account-order' >
                <div className='close' onClick={hide}>Hide</div>
                <Order id={orderId} />
              </div>
            )}
          </div>}
      </div>
    );
  }
}

const mapStateToProps = ({ user, orders }) => {
  orders = orders && orders.filter(order => order.userId === user.id);
  return { user, orders };
};

export default connect(mapStateToProps)(User);
