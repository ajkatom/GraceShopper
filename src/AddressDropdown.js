import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editOrder } from './redux/orders';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class AddressDropdown extends Component {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onClick(addressId) {
    const { cart } = this.props;
    const order = { id: cart.id, addressId };
    this.props.editOrder(order);
  }

  render() {
    const { addresses } = this.props;
    const { dropdownOpen } = this.state;
    const { toggle, onClick } = this;
    return (
      <div>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle>Select Address</DropdownToggle>
          <DropdownMenu>
            {addresses.map(address => {
              return (
                <DropdownItem
                  key={address.id}
                  onClick={() => onClick(address.id)}
                >
                  {address.fullAddress}
                </DropdownItem>
              );
            })}
            <DropdownItem onClick={() => onClick(null)}>
              New Address
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart }) => {
  const addresses = user.addresses || [];
  return {
    addresses,
    cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: order => dispatch(editOrder(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressDropdown);
