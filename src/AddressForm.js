import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateAddress, deleteAddress } from './store';
import { editOrder } from './redux/orders';
import { connect } from 'react-redux';

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: {
        lineOne: props.lineOne || '',
        lineTwo: props.lineTwo || '',
        city: props.city || '',
        state: props.state || '',
        zipCode: props.zipCode || ''
      },
      error: '',
      edited: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.setError = this.setError.bind(this);
  }

  componentDidMount() {
    const { lineOne, lineTwo, city, state, zipCode } = this.props.address;
    this.props.address &&
      this.setState({ address: { lineOne, lineTwo, city, state, zipCode } });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      const { lineOne, lineTwo, city, state, zipCode } = nextProps.address;
      nextProps.address !== this.state.address &&
        this.setState({
          address: { lineOne, lineTwo, city, state, zipCode }
        });
    }
  }

  onChange(ev) {
    const { name, value } = ev.target;
    let { address } = this.state;
    address = Object.assign({}, address, { [name]: value });
    this.setState({ address, error: '', edited: true });
  }

  onSubmit() {
    const { address } = this.state;
    const { user, cart } = this.props;
    address.userId = user && user.id;
    address.id = this.props.addressId;
    this.setState({ edited: false });
    this.props
      .createOrUpdateAddress(address, cart)
      .then(() => {
        this.props.onEdit();
      })
      .catch(err => {
        this.setError(err.response.data);
      });
  }

  onDelete() {
    const { address } = this.props;
    this.props.deleteAddress(address);
    this.props.onEdit();
  }

  onCancel() {
    this.props.onEdit();
  }

  setError(error) {
    this.setState({ error });
  }

  render() {
    const { error, address, edited } = this.state;
    const { lineOne, lineTwo, city, state, zipCode } = address;
    const { onChange, onSubmit, onDelete, onCancel } = this;
    const fields = { lineOne: 'Street', city: 'City', state: 'State', zipCode: 'Zip Code' };
    const empty = Object.keys(fields).filter(field => !this.state.address[field]);
    return (
      <div>
        <form>
          <input
            className='form-control'
            onChange={onChange}
            name='lineOne'
            value={lineOne || ''}
            placeholder='Street'
          />
          <input
            className='form-control'
            onChange={onChange}
            name='lineTwo'
            value={lineTwo || ''}
            placeholder='Apt, Suite, Unit, etc.'
          />
          <input
            className='form-control'
            onChange={onChange}
            name='city'
            value={city || ''}
            placeholder='City'
          />
          <input
            className='form-control'
            onChange={onChange}
            name='state'
            value={state.toUpperCase() || ''}
            placeholder='State'
            maxLength='2'
          />
          <input
            className='form-control'
            onChange={onChange}
            name='zipCode'
            value={zipCode || ''}
            placeholder='Zip Code'
            maxLength='5'
          />
        </form>
        {error && <Alert color='info'>{error}</Alert>}
        <button
          className='btn btn-primary'
          type='submit'
          onClick={onSubmit}
          disabled={!edited || empty.length}
        >
          Save Address
        </button>
        <button className='btn btn-danger' type='submit' onClick={onDelete}>
          Delete Address
        </button>
        <button className='btn btn-warning' type='submit' onClick={onCancel}>
          Cancel
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }, { cart }) => {
  const addressId = cart.addressId;
  const { addresses } = user;
  const address =
    addresses && addresses.find(address => address.id === addressId);
  return { address, addressId, user, cart };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: order => dispatch(editOrder(order)),
    deleteAddress: address => dispatch(deleteAddress(address)),
    createOrUpdateAddress: (address, id) =>
      dispatch(createOrUpdateAddress(address, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
