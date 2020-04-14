import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editOrder } from './redux/orders';
import { createOrUpdateUser } from './redux/user';
import { showUsers } from './redux/users';
import omit from 'object.omit';
import ProductForm from './ProductForm';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
<<<<<<< HEAD
      productId: null,
=======
      productId: null
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.hide = this.hide.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { history, user } = nextProps;
    if (!user.admin) history.push('/');
  }

  componentWillMount() {
    this.props.showUsers();
  }

  onChange(order) {
    order.shipped = !order.shipped;
    this.props.editOrder(order);
  }

  makeAdmin(user) {
    user = omit(user, 'name');
    user.admin = !user.admin;
    this.props.createOrUpdateUser(user);
  }

  onClick(productId) {
    this.setState({ showForm: true, productId: productId });
  }

  hide() {
    this.setState({ showForm: false });
  }

  render() {
<<<<<<< HEAD
    const { orders, categories, products, user, users } = this.props;
=======
    const {
      orders,
      categories,
      products,
      user,
      users
    } = this.props;
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
    const { onChange, onClick, hide, makeAdmin } = this;
    const { showForm, productId } = this.state;

    return !user.admin ? null : (
<<<<<<< HEAD
      <div className="dashboard">
        <div className="dashboard-item">
          <h1>Users</h1>
          <div className="dashboard-users">
=======
      <div className='dashboard'>
        <div className='dashboard-item'>
          <h1>Users</h1>
          <div className='dashboard-users'>
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
            <h5>Name</h5>
            <h5>Email</h5>
            <h5>Admin?</h5>
            {users &&
              users.map(_user => {
                return (
<<<<<<< HEAD
                  <div className="user-row" key={_user.id}>
                    <strong>{_user.name}</strong>
                    <Link to={`mailto:${_user.email}`}>{_user.email}</Link>
                    <div>
                      <label className="switch">
                        <input
                          checked={_user.admin}
                          type="checkbox"
                          datatype="toggle"
                          onChange={() => makeAdmin(_user)}
                        />
                        <span className="slider" />
=======
                  <div className='user-row' key={_user.id}>
                    <strong>{_user.name}</strong>
                    <Link to={`mailto:${_user.email}`}>{_user.email}</Link>
                    <div>
                      <label className='switch'>
                        <input
                          checked={_user.admin}
                          type='checkbox'
                          datatype='toggle'
                          onChange={() => makeAdmin(_user)}
                        />
                        <span className='slider' />
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
                      </label>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
<<<<<<< HEAD
        <div className="dashboard-item">
          <h1>All Orders</h1>
          <div className="dashboard-orders">
=======
        <div className='dashboard-item'>
          <h1>All Orders</h1>
          <div className='dashboard-orders'>
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
            <h5>Order ID</h5>
            <h5>Shipped?</h5>
            {orders.length &&
              orders.map(order => (
<<<<<<< HEAD
                <div className="dashboard-order-row" key={order.id}>
                  <Link to={`/orders/${order.id}`}> {order.id}</Link>
                  <div>
                    <label className="switch">
                      <input
                        checked={order.shipped}
                        type="checkbox"
                        datatype="toggle"
                        onChange={() => onChange(order)}
                      />
                      <span className="slider" />
=======
                <div className='dashboard-order-row' key={order.id}>
                  <Link to={`/orders/${order.id}`}> {order.id}</Link>
                  <div>
                    <label className='switch'>
                      <input
                        checked={order.shipped}
                        type='checkbox'
                        datatype='toggle'
                        onChange={() => onChange(order)}
                      />
                      <span className='slider' />
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>
<<<<<<< HEAD
        <div className="dashboard-item">
=======
        <div className='dashboard-item'>
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
          <h1>Products By Category</h1>
          {categories.map(category => {
            return (
              <div key={category.id}>
                <h2>{category.name}</h2>
<<<<<<< HEAD
                <div className="btn-group">
=======
                <div className='btn-group'>
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
                  {products.map(product => {
                    if (product.categoryId === category.id) {
                      return (
                        <button
<<<<<<< HEAD
                          type="submit"
                          className="btn btn-secondary"
=======
                          type='submit'
                          className='btn btn-secondary'
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
                          key={product.id}
                          onClick={() => onClick(product.id)}
                        >
                          {product.name}
                        </button>
                      );
                    }
<<<<<<< HEAD
=======

>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
                  })}
                </div>
              </div>
            );
          })}
          <br />
          {showForm && <strong onClick={hide}>hide</strong>}
          {showForm && <ProductForm productId={productId} hide={hide} />}
          <br />
          <div>
<<<<<<< HEAD
            <button type="submit" className="btn btn-secondary" onClick={() => onClick(null)}>
              Add New Product
            </button>
=======
            <button type='submit' className='btn btn-secondary' onClick={() => onClick(null)}>Add New Product</button>
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, orders, products, categories, users }) => {
  return {
    user,
    orders,
    categories,
    products,
<<<<<<< HEAD
    users,
=======
    users
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: order => {
      dispatch(editOrder(order));
    },
    showUsers: () => {
      dispatch(showUsers());
    },
    createOrUpdateUser: user => {
      dispatch(createOrUpdateUser(user, null, true));
<<<<<<< HEAD
    },
=======
    }
>>>>>>> 30cda0fc42ea8eee22e8b00f0af07ab93634c89b
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
