import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createOrUpdateAddress } from './store';
import axios from 'axios';

class Autocomplete extends Component {
  constructor() {
    super();
    this.state = {
      predictions: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(ev) {
    ev.target.value.length < 3 ?
      this.setState({ predictions: [] })
      :
      ev.target.value.length > 3 &&
      axios.post('/api/google/getpredictions', { input: ev.target.value })
        .then(res => res.data)
        .then(predictions => {
          this.setState({ predictions });
        });
  }

  onClick(placeId) {
    const { user, cart } = this.props;
    axios.post('/api/google/getplace', { query: placeId })
      .then(res => res.data)
      .then((_address) => {
        _address = _address[0];
        // get the formatted address and split it up
        let address = _address.formatted_address.split(', ');
        // split up the state and zip
        address[2] = address[2].split(' ');
        const { lat, lng } = _address.geometry.location;
        address = { lineOne: address[0], city: address[1], state: address[2][0], zipCode: address[2][1], lat, lng };
        address.userId = user && user.id;
        this.props.createOrUpdateAddress(address, cart);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { predictions } = this.state;
    const { onChange, onClick } = this;
    return (
      <div>
        <input onChange={onChange} />
        <img src='/images/powered_by_google_on_white.png' />
        <ul>
          {predictions.length ? predictions.map(pred => (
            <li key={pred.place_id} onClick={() => onClick(pred.place_id)}>{pred.description}</li>
          )) : null}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart }) => {
  return {
    user,
    cart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateAddress: (address, cart) => dispatch(createOrUpdateAddress(address, cart))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);
