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
      productId: null,
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
    const { orders, categories, products, user, users } = this.props;
    const { onChange, onClick, hide, makeAdmin } = this;
    const { showForm, productId } = this.state;

    return !user.admin ? null : (
      <div className="dashboard">
        <div className="dashboard-item">
          <h1>Users</h1>
          <div className="dashboard-users">
            <h5>Name</h5>
            <h5>Email</h5>
            <h5>Admin?</h5>
            {users &&
              users.map(_user => {
                return (
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
                      </label>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="dashboard-item">
          <h1>All Orders</h1>
          <div className="dashboard-orders">
            <h5>Order ID</h5>
            <h5>Shipped?</h5>
            {orders.length &&
              orders.map(order => (
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
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="dashboard-item">
          <h1>Products By Category</h1>
          {categories.map(category => {
            return (
              <div key={category.id}>
                <h2>{category.name}</h2>
                <div className="btn-group">
                  {products.map(product => {
                    if (product.categoryId === category.id) {
                      return (
                        <button
                          type="submit"
                          className="btn btn-secondary"
                          key={product.id}
                          onClick={() => onClick(product.id)}
                        >
                          {product.name}
                        </button>
                      );
                    }
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
            <button type="submit" className="btn btn-secondary" onClick={() => onClick(null)}>
              Add New Product
            </button>
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
    users,
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
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
