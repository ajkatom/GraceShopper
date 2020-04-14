import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateUser } from './redux/user';
import { connect } from 'react-redux';

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      edited: {},
      errors: {},
      strength: ''
    };
    this.validators = {
      oldPassword: value => {
        if (value !== props.user.password) {
          return `Old Password is incorrect`;
        }
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const { name, value } = ev.target;
    const { edited } = this.state;
    edited[name] = true;
    this.setState({ [name]: value, edited, errors: {} });
    if (name === 'newPassword') {
      this.testPassword();
    }
  }

  onSubmit(id) {
    const { newPassword } = this.state;
    const user = Object.assign({}, { id }, { password: newPassword });
    const errors = Object.keys(this.validators).reduce((map, field) => {
      const validator = this.validators[field];
      const value = this.state[field];
      const error = validator(value);
      if (error) {
        map[field] = error;
      }
      return map;
    }, {});
    if (!errors.oldPassword) {
      this.props.createOrUpdateUser(user);
      this.props.onUpdate();
    }
    this.setState({ errors, edited: {}, newPassword: '' });
  }

  testPassword() {
    const { newPassword } = this.state;
    const mediumStrength = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    const highStrength = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    let strength;
    if (!mediumStrength.test(newPassword)) {
      strength = `New Password is very weak`;
    } else if (!highStrength.test(newPassword)) {
      strength = `New Password could be stronger`;
    } else {
      strength = '';
    }
    this.setState({ strength });
  }

  render() {
    const { user } = this.props;
    const { oldPassword, newPassword, errors, strength } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div>
        <div>
          <input
            className='form-control'
            type='password'
            name='oldPassword'
            placeholder='Old Password'
            onChange={onChange}
            value={oldPassword}
          />
          <input
            className='form-control'
            type='password'
            name='newPassword'
            placeholder='New Password'
            onChange={onChange}
            value={newPassword}
          />
          {errors.oldPassword && (
            <Alert color='info'>{errors.oldPassword}</Alert>
          )}
          {strength &&
            !!newPassword.length && <Alert color='info'>{strength}</Alert>}
          <button
            type='submit'
            className='btn btn-success'
            style={{ width: '100%' }}
            onClick={() => onSubmit(user.id)}
            disabled={!oldPassword.length || !newPassword.length}
          >
            Change
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  user = user || {};
  return { user };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createOrUpdateUser: user => {
      dispatch(createOrUpdateUser(user, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);
